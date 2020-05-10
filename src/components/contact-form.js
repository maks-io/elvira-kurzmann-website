import React, { Component } from "react";

const MIN_REQUIRED_TIMESPAN = 30 * 1000; // 30 seconds

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined,
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    this.ContactForm = React.createRef();
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(
      (prevState) => ({
        ...prevState,
        [name]: value,
      }),
      () => {
        // console.log("form state:", this.state);
      }
    );
  };

  encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.lastSubmit &&
      new Date() - this.state.lastSubmit < MIN_REQUIRED_TIMESPAN
    ) {
      console.log(`Form Submit - Time Error`);
      this.setState({
        status: "TIME_ERROR",
      });
      return;
    }

    const form = this.ContactForm.current;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.encode({
        "form-name": form.getAttribute("name"),
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message,
      }),
    })
      .then((response) => {
        console.log(
          `Form Submit - Success: ${JSON.stringify(response, null, 2)}`
        );
        this.setState({
          status: "SUCCESS",
          lastSubmit: new Date(),
        });
      })
      .catch((error) => {
        console.log(`Form Submit - Post Error: ${error}`);
        this.setState({
          status: "POST_ERROR",
        });
      });
  };

  render() {
    const { handleClose } = this.props;

    const { status } = this.state;
    if (status === "SUCCESS") {
      return (
        <FormContainer header={"Danke für deine Nachricht!"}>
          <p>
            <button onClick={handleClose}>Zurück zur Webseite</button>
          </p>
        </FormContainer>
      );
    }

    if (status === "POST_ERROR") {
      return (
        <FormContainer header={"Ein Fehler ist aufgetreten!"}>
          <p>
            <button
              onClick={() => {
                this.setState({ status: undefined });
              }}
            >
              Erneut versuchen
            </button>
          </p>
          <p>
            <button onClick={handleClose}>Zurück zur Webseite</button>
          </p>
        </FormContainer>
      );
    }

    if (status === "TIME_ERROR") {
      return (
        <FormContainer
          header={
            "Bitte warte ein wenig bevor du eine erneute Anfrage schickst."
          }
        >
          <p>
            <button
              onClick={() => {
                this.setState({ status: undefined });
              }}
            >
              Erneut versuchen
            </button>
          </p>
          <p>
            <button onClick={handleClose}>Zurück zur Webseite</button>
          </p>
        </FormContainer>
      );
    }

    const { name, email, subject, message } = this.state;

    const readyToSubmit = (() => {
      if (!this.ContactForm || !this.ContactForm.current) {
        return true;
      }
      const formInputs = Array.prototype.slice.call(
        this.ContactForm.current.elements
      );
      return formInputs.some((i) => i.validity.valid === false);
    })();

    return (
      <FormContainer header={"Ich freue mich über deine Nachricht!"}>
        <form
          onSubmit={this.handleSubmit}
          name="contact"
          action="/"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="form"
          ref={this.ContactForm}
        >
          {/* ===== bot-field ===== */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          {/* ===== name-field ===== */}
          <p>
            <label>
              Name
              <br />
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                required
                value={name}
                onChange={this.handleChange}
              />
            </label>
          </p>
          {/* ===== email-field ===== */}
          <p>
            <label>
              Email
              <br />
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </p>
          {/* ===== subject-field ===== */}
          <p>
            <label>
              Betreff
              <br />
              <input
                type="text"
                placeholder="Betreff"
                id="subject"
                name="subject"
                required
                value={subject}
                onChange={this.handleChange}
              />
            </label>
          </p>
          {/* ===== message-field ===== */}
          <p>
            <label>
              Nachricht
              <br />
              <textarea
                placeholder="Nachricht"
                id="message"
                name="message"
                required
                rows="4"
                value={message}
                onChange={this.handleChange}
              />
            </label>
          </p>
          {/* ===== submit-button ===== */}
          <div>
            <button
              type="submit"
              name="submit"
              value="Submit"
              disabled={readyToSubmit}
            >
              Nachricht absenden!
            </button>
          </div>
        </form>
      </FormContainer>
    );
  }
}

const FormContainer = ({ header, children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height: "100%",
    }}
  >
    <h2>Kontakt</h2>
    <h3>{header}</h3>
    {children}
  </div>
);

export default ContactForm;
