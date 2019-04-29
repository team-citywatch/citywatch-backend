import dotenv = require("dotenv");
import { factory } from "./logger";

const log = factory.getLogger("Env");

const _env_load = dotenv.load();

if (_env_load.error) {
    log.error("Dotenv load failed");
}

const env = _env_load.parsed!;

export const DB_ENDPOINT = env.DB_ENDPOINT!;
export const DB_PASSWORD = env.DB_PASSWORD!;
export const DB_USERNAME = env.DB_USERNAME!;
export const DB_NAME = env.DB_NAME!;