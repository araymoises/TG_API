import dotenv from 'dotenv';

const envFound = dotenv.config();

const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI || "";
if(MONGODB_URI === "") throw new Error("MONGODB_URI not declared");

const WEBSITE_URL: string = process.env.WEBSITE_URL || "";
if(WEBSITE_URL === "") throw new Error("WEBSITE_URL not declared");

const BASE_URL: string = process.env.BASE_URL || "";
if(BASE_URL === "") throw new Error("BASE_URL not declared");

const AUTH_TOKEN_EXPIRATION: number = parseInt(process.env.AUTH_TOKEN_EXPIRATION || "86400") // 60 * 60 * 24

export default {
    PORT: PORT,
    MONGODB_URI: MONGODB_URI,
	WEBSITE_URL: WEBSITE_URL,
	AUTH_TOKEN_EXPIRATION,
	BASE_URL
}