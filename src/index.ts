import { Events, GatewayIntentBits } from "discord.js";
import CommandClient from "./client";
import { TOKEN } from "./constants";
import { initializeDatabase } from "./utils/database";

initializeDatabase();

export const client = new CommandClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (c: any) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);
