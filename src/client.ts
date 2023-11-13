import { ActivityType, Client, ClientOptions, Collection, Events } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { GUILD_ID } from "./constants";
import { generateEmbed } from "./utils/discord";

export default class CommandClient extends Client {
  commands: Collection<any, any>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.loadCommands();
    this.setStatus();
    this.handleCommands();
  }

  private loadCommands() {
    const foldersPath = path.join(__dirname, "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          this.commands.set(command.data.name, command);
        }
      }
    }
  }

  private setStatus() {
    this.once(Events.ClientReady, () => {
      this.user?.setPresence({
        activities: [
          {
            name: `in the Metaverse!`,
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      });
    });
  }

  private handleCommands() {
    this.on(Events.InteractionCreate, async (interaction) => {
      const botUser = interaction.client.user;

      if (!interaction.isChatInputCommand()) return;

      if (interaction.guild?.id != GUILD_ID) {
        await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Server Only Command")
              .setDescription(`Commands are only usable in a server setting.`),
          ],
        });
        return;
      }

      const command = this.commands.get(interaction.commandName);

      if (!command) {
        console.error(`${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.execute(interaction, botUser);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
