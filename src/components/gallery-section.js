import React from "react";
import Picture from "./picture";

const GallerySection = (props) => {
  const { focusedPictureData, filteredPictures, setFocus } = props;

  return (
    <div
      className={"gallery"}
      style={{
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        maxHeight: "min-content",
        overflowX: "hidden",
        pointerEvents: focusedPictureData && "none",
      }}
    >
      {filteredPictures.map((p, index) => (
        <Picture
          key={`picture-${index}`}
          data={p}
          setFocus={setFocus}
          isLast={filteredPictures.length - 1 === index}
        />
      ))}
    </div>
  );
};

export default GallerySection;
