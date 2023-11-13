import fs from "fs";

const configFile = fs.readFileSync("./config.json", "utf8");
const config = JSON.parse(configFile);

export const TOKEN = config.token;
export const CLIENT_ID = config.clientId;
export const GUILD_ID = config.guildId;
export const VERIFIED_LOG_CHANNEL = config.verifiedLogChannel;

export const DOMAIN_REGEX = /^\*\.[a-zA-Z]{2,}|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PENDING_EXPIRATION = config.pendingExpirationInMinutes;
export const MAX_ATTEMPTS = config.maxAttempts;

export const VERIFIED_ROLE = "Verified";

export const EMAIL_ADDRESS = config.emailAddress;
export const EMAIL_PASSWORD = config.emailPassword;
