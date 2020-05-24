import React from "react";
import FilterTag from "./filter-tag";
import colors from "../colors";

const FilterSection = (props) => {
  const {
    focusedPictureData,
    paintingSubjectFilter,
    availablePaintingSubjects,
    setPaintingSubjectFilter,
  } = props;

  return (
    <div
      className={"filters"}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        pointerEvents: focusedPictureData && "none",
        marginBottom: "2rem",
      }}
    >
      {["ALLE THEMEN", ...availablePaintingSubjects].map((ps, index) => (
        <FilterTag
          name={ps}
          color={colors.colorF}
          active={
            index === 0
              ? !paintingSubjectFilter
              : !paintingSubjectFilter || paintingSubjectFilter === ps
          }
          onClick={() => setPaintingSubjectFilter(ps, index)}
        />
      ))}
    </div>
  );
};

export default FilterSection;
