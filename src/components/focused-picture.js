import React, { Component } from "react";
import _ from "lodash";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";

class FocusedPicture extends Component {
  state = { windowWidth: window.innerWidth, windowHeight: window.innerHeight };
  // state = {};

  render() {
    const { data, onClick } = this.props;
    if (!data) return null;
    const {
      media_url: src,
      parsedDescription: { title, paintingSubject, paintingType, size, price },
      permalink,
    } = data;

    const subtitleElements = [];
    if (paintingSubject) {
      subtitleElements.push(<span>{paintingSubject}</span>);
    }
    if (paintingType) {
      subtitleElements.push(<span>{paintingType}</span>);
    }
    if (size.width && size.height) {
      subtitleElements.push(
        <span>
          {size.width} x {size.height} cm
        </span>
      );
    }
    if (price) {
      subtitleElements.push(<span>{price}€</span>);
    }

    return (
      <div
        onClick={onClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "0px",
          height: "100vh",
          width: "100vw",
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            justifyContent: "center",
          }}
        >
          <img
            className={"picture"}
            src={src}
            style={{
              cursor: "pointer",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            // width={this.state.windowWidth}
            // height={this.state.windowHeight}
            alt={"focused-pic"}
          />
          <div
            style={{ position: "absolute", top: 0, left: 0, padding: "1vw" }}
          >
            <InstagramButton permalink={permalink} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              textAlign: "right",
              backgroundColor: "black",
              opacity: 0.65,
              color: "white",
              fontWeight: "bold",
              fontSize: "min(5vw, 24px)",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                margin: "0.2rem 1rem",
                fontSize: "min(5vw, 24px)",
                letterSpacing: "0.3rem",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {title}
            </div>
            {subtitleElements.length > 0 && (
              <div
                style={{
                  margin: "0.2rem 0 0.6rem 0",
                  letterSpacing: "min(0.1rem, 1vw)",
                  fontSize: "min(3vw,18px)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Subtitle elements={subtitleElements} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FocusedPicture;

const Subtitle = ({ elements, isSmallDevice }) => {
  return _.flatMap(elements, (value, index, array) =>
    array.length - 1 !== index
      ? [value, <Bulls isSmallDevice={isSmallDevice} />]
      : value
  );
};

const Bulls = ({ isSmallDevice }) => (
  <span
    style={{
      margin: isSmallDevice ? "0 1.8vw" : "0 1rem",
      fontWeight: "normal",
    }}
  >
    &bull;
  </span>
);

class InstagramButton extends Component {
  state = { isHovered: false };

  render() {
    const { permalink } = this.props;
    const url = permalink;
    return (
      <a
        href={url}
        target={"blank"}
        style={{
          filter: "drop-shadow(0px 0px 6px black)",
          color: "white",
          fontSize: "1.8rem",
          margin: "0.4vw",
          opacity: this.state.isHovered ? 0.9 : 0.65,
        }}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
        title={"Klicken um Bild auf Instagram anzuzeigen..."}
      >
        <InstagramOutlined />
      </a>
    );
  }
}
