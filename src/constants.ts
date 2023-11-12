import fs from "fs";

const configFile = fs.readFileSync("./config.json", "utf8");
const config = JSON.parse(configFile);

export const TOKEN = config.token;
export const CLIENT_ID = config.clientId;
export const GUILD_ID = config.guildId;

export const DOMAIN_REGEX = /^\*\.[a-zA-Z]{2,}|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PENDING_EXPIRATION = config.pendingExpiration;
export const MAX_PENDING_ALLOWED = config.maxPendingAllowed;
export const MAX_ATTEMPTS = config.maxAttempts;
