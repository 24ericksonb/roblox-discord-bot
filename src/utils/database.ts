import { sequelize } from "../database/sequelize";
import { PENDING_EXPIRATION } from "../constants";
import { DiscordDatabase } from "../database/database";
import Domain from "../database/models/domain";
import Pending from "../database/models/pending";
import Blacklist from "../database/models/blacklist";

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database initialized!");
  } catch (error) {
    console.error(`Unable to connect to the database. Error ${error}`);
  }
}

export async function cleanUpPending(): Promise<void> {
  const db = DiscordDatabase.getInstance();
  const pending = await db.getAllPending();
  for (const element of pending) {
    const now = new Date();

    if ((now.getTime() - element.createdAt.getTime()) / (60 * 1000) >= PENDING_EXPIRATION) {
      await db.deletePending(element.id);
    }
  }
}

export async function getDomainList(): Promise<string | null> {
  const db = DiscordDatabase.getInstance();
  const domainList = await db.getDomains();
  return domainList.length > 0
    ? domainList.map((domainObj: Domain) => `\`${domainObj.domain}\``).join(", ")
    : null;
}

export async function getEmailList(): Promise<string> {
  const db = DiscordDatabase.getInstance();
  const blacklist = await db.getEmails();
  return blacklist.length > 0
    ? blacklist.map((blacklistObj: Blacklist) => `\`${blacklistObj.email}\``).join(", ")
    : "None";
}

export function getExpireInMinutes(pending: Pending): number {
  const currentTime = new Date().getTime();
  const creationTime = pending.createdAt.getTime();
  const difference = PENDING_EXPIRATION - (currentTime - creationTime) / (60 * 1000);
  return Math.max(parseInt(difference.toString()), 1);
}
