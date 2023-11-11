import fs from "fs";
import { Sequelize } from "sequelize";

const configFile = fs.readFileSync("./config.json", "utf8");
const config = JSON.parse(configFile);

export const TOKEN = config.token;
export const CLIENT_ID = config.clientId;
export const GUILD_ID = config.guildId;

export const SEQUELIZE = new Sequelize({
  dialect: "sqlite",
  storage: "discord.db",
});

export const DOMAIN_REGEX = /^\*\.[a-zA-Z]{2,}|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
