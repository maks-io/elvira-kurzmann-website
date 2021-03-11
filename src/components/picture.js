import React, { Component } from "react";

const thumbnailHeight = 12; // unit: rem

class Picture extends Component {
  state = { isHovered: false };

  render() {
    const { data, setFocus, isLast } = this.props;
    const { media_url: src } = data;

    return (
      <div
        style={{
          maxWidth: "min(80vw, 300px)",
          margin: "1rem",
          marginBottom: isLast && "6rem",
        }}
      >
        <img
          className={"picture"}
          src={src}
          style={{
            // width: `${thumbnailWidth}rem`,
            // height: `${thumbnailHeight}rem`,
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            cursor: "pointer",
            transform: this.state.isHovered && "scale(1.2)",
          }}
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
          onClick={() => setFocus(data.id)}
          alt={"small-pic"}
        />
      </div>
    );
  }
}
export default Picture;
