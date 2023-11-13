import { sequelize } from "../database/sequelize";
import { PENDING_EXPIRATION } from "../constants";
import { DiscordDatabase } from "../database/database";

export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database initialized!");
  } catch (error) {
    console.error(`Unable to connect to the database. Error ${error}`);
  }
}

export async function cleanUpPending() {
  const db = DiscordDatabase.getInstance();
  const pending = await db.getAllPending();
  for (const element of pending) {
    const now = new Date();

    if ((now.getTime() - element.createdAt.getTime()) / (60 * 1000) >= PENDING_EXPIRATION) {
      await db.deletePending(element.id);
    }
  }
}
