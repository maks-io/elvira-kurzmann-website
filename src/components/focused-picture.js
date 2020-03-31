import React, { Component } from "react";
import ResizeDetector from "react-resize-detector";
import _ from "lodash";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";

class FocusedPicture extends Component {
  state = { windowWidth: window.innerWidth, windowHeight: window.innerHeight };
  // state = {};

  handleResize = (width, height) => {
    this.setState({
      windowWidth: width,
      windowHeight: height,
    });
  };

  render() {
    const { data, onClick } = this.props;
    if (!data) return null;
    const {
      display_url: src,
      dimensions: { height: originalHeight, width: originalWidth },
      parsedDescription: { title, paintingType, size, price },
      shortcode,
    } = data;

    const windowRatio = this.state.windowHeight / this.state.windowWidth;
    const pictureRatio = originalHeight / originalWidth;

    const widthIsTheLimit = windowRatio >= pictureRatio;

    const limitingDimensions = {
      width: widthIsTheLimit ? `${this.state.windowWidth}px` : "100%",
      height: !widthIsTheLimit ? `${this.state.windowHeight}px` : "100%",
    };

    const isSmallDevice = this.state.windowWidth < 600;

    const subtitleElements = [];
    if (paintingType) {
      subtitleElements.push(<span>{paintingType}</span>);
    }
    if (size.width && size.height) {
      subtitleElements.push(
        <span>
          {size.width}cm x {size.height}cm
        </span>
      );
    }
    if (price) {
      subtitleElements.push(<span>{price}€</span>);
    }

    return (
      <ResizeDetector handleWidth handleHeight onResize={this.handleResize}>
        <div
          onClick={onClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0px",
            ...limitingDimensions,
          }}
        >
          <div style={{ position: "relative", display: "flex" }}>
            <img
              className={"picture"}
              src={src}
              style={{
                cursor: "pointer",
              }}
              width={widthIsTheLimit && this.state.windowWidth}
              height={!widthIsTheLimit && this.state.windowHeight}
            />
            <div
              style={{ position: "absolute", top: 0, left: 0, padding: "1vw" }}
            >
              <InstagramButton shortcode={shortcode} />
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
                fontSize: "2rem",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <div
                style={{
                  margin: "0.2rem 1rem",
                  fontSize: isSmallDevice ? "6vw" : "2.0rem",
                  letterSpacing: "0.3rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {title}
              </div>
              {subtitleElements.length > 0 && (
                <div
                  style={{
                    margin: "0.2rem 0 0.6rem 0",
                    letterSpacing: isSmallDevice ? "0.8vw" : "0.5rem",
                    fontSize: isSmallDevice ? "4vw" : "1.2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Subtitle
                    elements={subtitleElements}
                    isSmallDevice={isSmallDevice}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </ResizeDetector>
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
    const { shortcode } = this.props;
    const url = `https://www.instagram.com/p/${shortcode}`;
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
