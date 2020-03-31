import React, { Component } from "react";

const thumbnailHeight = 12; // unit: rem

class Picture extends Component {
  state = { isHovered: false };

  render() {
    const { data,setFocus } = this.props;
    const {
      display_url: src,
      dimensions: { height: originalHeight, width: originalWidth },
    } = data;

    const ratio = parseFloat(originalHeight) / parseFloat(originalWidth);
    const thumbnailWidth = thumbnailHeight / ratio;

    return (
        <img
          className={"picture"}
          src={src}
          style={{
            width: `${thumbnailWidth}rem`,
            height: `${thumbnailHeight}rem`,
            margin: "1rem",
            cursor: "pointer",
            transform: this.state.isHovered && "scale(1.2)",
          }}
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
          onClick={() => setFocus(data.id)}
        />
    );
  }
}
export default Picture;
