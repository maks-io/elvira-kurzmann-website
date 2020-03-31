const REGEX_PAINTINGTYPE = /^(Acryl|Aquarell|Kohle|Öl)$/i;
const REGEX_DIMENSIONS = /^([0-9]*)cm x ([0-9]*)cm$/;
const REGEX_PRICE = /^([0-9]*)€$/;

export const parseDescription = (pictureData) => {
  const descriptionSegments = pictureData.node.edge_media_to_caption.edges[0].node.text.split(
    "\n"
  );

  const title = descriptionSegments[0];
  let paintingType;
  descriptionSegments.forEach((s) => {
    if (RegExp(REGEX_PAINTINGTYPE).test(s)) {
      const matches = s.match(REGEX_PAINTINGTYPE);
      paintingType = matches[1];
    }
  });
  const size = {};
  descriptionSegments.forEach((s) => {
    if (RegExp(REGEX_DIMENSIONS).test(s)) {
      const matches = s.match(REGEX_DIMENSIONS);
      size.width = matches[1];
      size.height = matches[2];
    }
  });
  let price;
  descriptionSegments.forEach((s) => {
    if (RegExp(REGEX_PRICE).test(s)) {
      const matches = s.match(REGEX_PRICE);
      price = matches[1];
    }
  });

  return { descriptionSegments, title, paintingType, size, price };
};
