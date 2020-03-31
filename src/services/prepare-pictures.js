import _ from "lodash";
import { parseDescription } from "./parse-description";

export const preparePictures = (fetchedPictureData) => {
  const preparedPictures = fetchedPictureData.data.data.user.edge_owner_to_timeline_media.edges.map(
    (p) => ({
      ...p.node,
      nrOfLikes: p.node.edge_media_preview_like.count,
      parsedDescription: parseDescription(p),
    })
  ).reverse(); // this additional reverse() keeps correct order of pictures with equal nrOfLikes
  return _.sortBy(preparedPictures, "nrOfLikes").reverse();
};
