import React from "react";
import colors from "../colors";

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
        marginTop: "2rem",
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
          margin: "0.3rem 0.2rem",
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
