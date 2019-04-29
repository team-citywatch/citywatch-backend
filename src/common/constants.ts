require("dotenv").config();

export const DB_ENDPOINT = process.env.DB_ENDPOINT!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_NAME = process.env.DB_NAME!;

export const WHAT3WORDS_API_KEY = process.env.WHAT3WORDS_API_KEY!;

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID!;
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_SECRET_KEY!;
export const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL!;
