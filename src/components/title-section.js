import React from "react";
import colors from "../colors";
import constants from "../constants";

const TitleSection = ({ children }) => {
  return (
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
        marginTop: constants.FILTER_SECTION_HEIGHT,
      }}
    >
      <div
        style={{
            display: "flex",
          lineHeight: "2rem",
          opacity: 0.65,
          filter: "drop-shadow(0px 0px 45px black)",
        }}
      >
        Elvira Kurzmann
      </div>
      <div
        style={{
            display: "flex",
          fontSize: "1rem",
          opacity: 1.0,
          filter: "drop-shadow(0px 0px 45px black)",
        }}
      >
        Malen und Kunst aus Stockerau
      </div>
      {children}
    </div>
  );
};

export default TitleSection;
