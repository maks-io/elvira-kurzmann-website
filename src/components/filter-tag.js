import React, { Component } from "react";
import colors from "../colors";
import constants from "../constants";

class FilterTag extends Component {
  render() {
    const { name, title, active, onClick, color } = this.props;
    return (
      <div
        title={title}
        onClick={onClick}
        style={{
          fontSize: 11,
          fontWeight: "bold",
          padding: "3px 6px",
          margin: constants.FILTERS_MARGIN,
          backgroundColor: color,
          color: colors.colorC,
          opacity: !active && 0.4,
          cursor: "pointer",
          height: "max-content",
        }}
      >
        {name}
      </div>
    );
  }
}

export default FilterTag;
