import { Events, GatewayIntentBits } from "discord.js";
import CommandClient from "./utils/command-client";
import { DISCORD_TOKEN } from "./constants";

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

client.login(DISCORD_TOKEN);
