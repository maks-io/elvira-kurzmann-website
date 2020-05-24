import React from "react";
import colors from "../colors";
import constants from "../constants";

const TitleSection = () => {
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
          lineHeight: "2rem",
          opacity: 0.65,
          filter: "drop-shadow(0px 0px 45px black)",
        }}
      >
        Elvira Kurzmann
      </div>
      <div
        style={{
          fontSize: "1rem",
          opacity: 1.0,
          filter: "drop-shadow(0px 0px 45px black)",
        }}
      >
        Malen und Kunst aus Stockerau
      </div>
    </div>
  );
};

export default TitleSection;
