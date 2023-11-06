import dotenv from "dotenv";
import { getIntEnvVar, getStringEnvVar } from "./utils/general";

dotenv.config();

// Discord configuration
export const DISCORD_TOKEN = getStringEnvVar("DISCORD_TOKEN", "");
export const DISCORD_CLIENT_ID = getStringEnvVar("DISCORD_CLIENT_ID", "");
export const GUILD_ID = getStringEnvVar("GUILD_ID", "");

// Google Forms configuration
export const FORM_ID = getStringEnvVar("FORM_ID", "");
export const GOOGLE_FORM_UPDATES = getIntEnvVar("GOOGLE_FORM_UPDATES", 0);

// Update intervals (in minutes)
export const STATUS_UPDATE_INTERVAL = getIntEnvVar(
  "STATUS_UPDATE_IN_MINUTES",
  60,
);

// Role configuration
export const ROLES = {
  VERIFIED: "Verified",
  UNVERIFIED: "Not Verified",
};

// Ensure that the required configurations are set
const requiredConfigs = [DISCORD_TOKEN, DISCORD_CLIENT_ID, GUILD_ID];

if (GOOGLE_FORM_UPDATES === 1) {
  requiredConfigs.push(FORM_ID);
}

requiredConfigs.forEach((config) => {
  if (!config) {
    throw new Error("Missing required environment variable");
  }
});
