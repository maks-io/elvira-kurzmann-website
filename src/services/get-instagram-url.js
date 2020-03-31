export const getInstagramUrl = (userId, limit) =>
  `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={%22id%22:%22${userId}%22,%22first%22:${limit}}`;
