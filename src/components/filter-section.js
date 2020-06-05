import React from "react";
import FilterTag from "./filter-tag";
import colors from "../colors";
import constants from "../constants";

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
        // height: constants.FILTER_SECTION_HEIGHT,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        pointerEvents: focusedPictureData && "none",
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
