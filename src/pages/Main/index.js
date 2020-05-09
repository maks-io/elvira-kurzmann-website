import React, { Component } from "react";
import axios from "axios";
import Modal from "react-modal";
import Picture from "../../components/picture";
import { slide as Menu } from "react-burger-menu";
import { menuStyles } from "./styles";
import colors from "../../colors";
import config from "../../config";
import { preparePictures } from "../../services/prepare-pictures";
import FocusedPicture from "../../components/focused-picture";
import { getInstagramUrl } from "../../services/get-instagram-url";

class MenuItem extends Component {
  state = { isHovered: false };

  render() {
    const { id, name, onClick, closeMenu } = this.props;
    return (
      <div
        id={id}
        className="bm-item"
        onClick={() => {
          onClick();
          closeMenu();
        }}
        style={{
          display: "flex",
          margin: "1rem",
          color: this.state.isHovered ? colors.colorD : colors.colorC,
          textDecoration: "none",
          cursor: "pointer",
        }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {name}
      </div>
    );
  }
}

class Main extends Component {
  state = {
    menuOpen: false,
    pictures: [],
    focusedPicture: undefined,
    impressumIsOpen: false,
    kontaktIsOpen: false,
    form: { name: "", email: "", subject: "", message: "" },
  };

  componentDidMount = async () => {
    const url = getInstagramUrl(config.userId, config.limit);
    const fetchedPictureData = await axios.get(url);
    this.setState({
      pictures: preparePictures(fetchedPictureData),
    });

    Modal.setAppElement("#outer-container");
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  toggleMenu() {
    this.setState((state) => ({ menuOpen: !state.menuOpen }));
  }

  setFocus = (pictureId) => {
    this.setState({ focusedPicture: pictureId });
  };

  closeModals = () => {
    this.setState({ impressumIsOpen: false, kontaktIsOpen: false });
  };

  handleFormFieldChange = (e) => {
    const { name, value } = e.target;

    this.setState(
      (prevState) => ({
        ...prevState,
        form: { ...prevState.form, [name]: value },
      }),
      () => {
        console.log("form state:", this.state.form);
      }
    );
  };

  render() {
    const filter = this.state.focusedPicture && "blur(6px)";
    const focusedPictureData =
      this.state.focusedPicture &&
      this.state.pictures.filter((p) => p.id === this.state.focusedPicture)[0];

    const { name, email, subject, message } = this.state.form;

    return (
      <React.Fragment>
        <div
          id="outer-container"
          style={{
            fontFamily: "Roboto Slab",
            backgroundImage: `linear-gradient(to right bottom, ${colors.colorC}, ${colors.colorB}), url("/assets/background/bg2.jpg")`,
            backgroundBlendMode: "hue",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            filter,
          }}
          onClick={() => {
            if (this.state.focusedPicture) {
              this.setState({ focusedPicture: undefined });
            }
          }}
        >
          <Menu
            right
            styles={{ ...menuStyles }}
            isOpen={this.state.menuOpen}
            onStateChange={(state) => this.handleStateChange(state)}
          >
            <MenuItem
              id={"start"}
              name={"Startseite"}
              onClick={this.closeModals}
              closeMenu={this.closeMenu}
            />
            <MenuItem
              id={"kontakt"}
              name={"Kontakt"}
              onClick={() => this.setState({ kontaktIsOpen: true })}
              closeMenu={this.closeMenu}
            />
            <MenuItem
              id={"impressum"}
              name={"Impressum"}
              onClick={() => this.setState({ impressumIsOpen: true })}
              closeMenu={this.closeMenu}
            />
          </Menu>
          <main
            id="page-wrap"
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              width: "80vw",
            }}
          >
            <div
              className={"title"}
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 500,
                fontSize: "3rem",
                color: colors.colorB,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  margin: "0 1rem",
                  lineHeight: "2rem",
                  opacity: 0.65,
                  filter: "drop-shadow(0px 0px 45px black)",
                }}
              >
                Elvira Kurzmann
              </div>
              <div
                style={{
                  margin: "0.3rem 1rem",
                  fontSize: "1rem",
                  opacity: 1.0,
                  filter: "drop-shadow(0px 0px 45px black)",
                }}
              >
                Malen und Kunst aus Stockerau
              </div>
              <style>
                {`
                   .title {
                       animation: moveTitle 4s forwards;
                   }
                   
                   @keyframes moveTitle {
                     0% {
                       opacity: 0;
                       height: ${window.innerHeight}px;
                     }
                     50% {
                       opacity: 1;
                       height: ${window.innerHeight}px;
                     }
                     100% {
                       height: 10rem;
                     }
                   }
              `}
              </style>
            </div>
            <div
              className={"gallery"}
              style={{
                display: "flex",
                flex: 1,
                flexWrap: "wrap",
                justifyContent: "center",
                maxHeight: "min-content",
                overflowX: "hidden",
                pointerEvents: focusedPictureData && "none",
              }}
            >
              {this.state.pictures.map((p, index) => (
                <Picture
                  key={`picture-${index}`}
                  data={p}
                  setFocus={this.setFocus}
                />
              ))}
            </div>
            <style>
              {`
                   .gallery {
                       animation: galleryFadeIn 5s forwards;
                   }
                   
                   @keyframes galleryFadeIn {
                     0% {
                       opacity: 0;
                     }
                     50% {
                       opacity: 0;
                     }
                     100% {
                       opacity: 1;
                     }
                   }
              `}
            </style>
          </main>
        </div>
        <FocusedPicture
          data={focusedPictureData}
          onClick={() => this.setState({ focusedPicture: undefined })}
        />
        <Modal
          isOpen={this.state.kontaktIsOpen}
          onRequestClose={this.closeModals}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100%",
            }}
          >
            <h2>Kontakt</h2>
            <h3>Ich freue mich über deine Nachricht!</h3>
            <form
              name="contact"
              className="form"
              method="POST"
              data-netlify="true"
            >
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={this.handleFormFieldChange}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={this.handleFormFieldChange}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Betreff"
                  id="subject"
                  name="subject"
                  required
                  value={subject}
                  onChange={this.handleFormFieldChange}
                />
                <label htmlFor="subject">Betreff</label>
              </div>
              <div>
                <textarea
                  placeholder="Nachricht"
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={message}
                  onChange={this.handleFormFieldChange}
                ></textarea>
                <label htmlFor="message">Deine Nachricht</label>
              </div>

              <div>
                <button type="submit" name="submit" value="Submit">
                  Nachricht absenden!
                </button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.impressumIsOpen}
          onRequestClose={this.closeModals}
        >
          <div
            onClick={this.closeModals}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              height: "100%",
            }}
          >
            <h2>Impressum</h2>
            <h3>Elvira Kurzmann</h3>
            <h4>Malen und Kunst aus Stockerau</h4>
            <p>
              Theodor Körner-Straße 6<br />
              2000 Stockerau
            </p>
          </div>
        </Modal>
        <style>
          {`
                      .ReactModal__Overlay {
                        z-index: 9999;
                      }
                    `}
        </style>
      </React.Fragment>
    );
  }
}

export default Main;
