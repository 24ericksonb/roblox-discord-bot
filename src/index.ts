import { Events, GatewayIntentBits } from "discord.js";
import CommandClient from "./utils/Client";

require("dotenv").config();

const discordToken: string = process.env.DISCORD_TOKEN || "";

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

client.login(discordToken);

throw Error("test");
