import dotenv from "dotenv";

dotenv.config()

export const getInstagramUrl = () => `${process.env.REACT_APP_MEDIA_URL}`;
