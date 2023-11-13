import { TOKEN } from "./constants";
import { Events, GatewayIntentBits } from "discord.js";
import CommandClient from "./client";
import { initializeDatabase } from "./utils/database";

initializeDatabase();

const client = new CommandClient({
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
