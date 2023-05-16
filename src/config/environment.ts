import dotenv from 'dotenv';

const envFound = dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:mYWxRHtFO0pultP0@cluster0.0nnu6.mongodb.net/api?retryWrites=true&w=majority";

const JWT_SECRET = process.env.JWT_SECRET || "wKtYc83sFLTICSgZ";

const WEBSITE_URL: string = process.env.WEBSITE_URL || "https://api-arclassroom-tesis.herokuapp.com/";
if (WEBSITE_URL === "") throw new Error("WEBSITE_URL not declared");

const BASE_URL: string = process.env.BASE_URL || "https://api-arclassroom-tesis.herokuapp.com/";
if (BASE_URL === "") throw new Error("BASE_URL not declared");

const AUTH_TOKEN_EXPIRATION: string = process.env.AUTH_TOKEN_EXPIRATION || "2592000" // 60 * 60 * 24 * 30

export default {
  PORT: PORT,
  MONGODB_URI: MONGODB_URI,
  JWT_SECRET,
  WEBSITE_URL: WEBSITE_URL,
  AUTH_TOKEN_EXPIRATION,
  BASE_URL
}
