import { parseDescription } from "./parse-description";

export const preparePictures = (fetchedPictureData) => {
  const preparedPictures = fetchedPictureData.data.map((d) => ({
    ...d,
    parsedDescription: parseDescription(d.caption),
  }));
  return preparedPictures;
};
