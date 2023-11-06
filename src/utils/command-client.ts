import {
  ActivityType,
  Client,
  ClientOptions,
  Collection,
  Events,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { getFormResponseNumber } from "./google-forms";
import { GOOGLE_FORM_UPDATES, STATUS_UPDATE_INTERVAL } from "../constants";

export default class CommandClient extends Client<boolean> {
  commands: Collection<any, any>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.loadCommands();
    this.setStatus();
    this.handleCommands();
  }

  loadCommands() {
    const foldersPath = path.join(__dirname, "..", "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          this.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
          );
        }
      }
    }
  }

  setStatus() {
    const updateFormsStatus = async () => {
      try {
        const numResponses = await getFormResponseNumber();
        const status = numResponses === 1 ? "Member" : "Members";
        this.user?.setPresence({
          activities: [
            {
              name: `Verifying ${numResponses} ${status}!`,
              type: ActivityType.Custom,
            },
          ],
          status: "online",
        });
      } catch (error) {
        console.error(error);
      }
    };

    const updateBaseStatus = async () => {
      this.user?.setPresence({
        activities: [
          {
            name: `in the Metaverse!`,
            type: ActivityType.Playing,
          },
        ],
        status: "online",
      });
    };

    this.once(Events.ClientReady, () => {
      if (GOOGLE_FORM_UPDATES) {
        updateFormsStatus();
        setInterval(updateFormsStatus, STATUS_UPDATE_INTERVAL * 60 * 1000);
      } else {
        updateBaseStatus();
      }
    });
  }

  handleCommands() {
    this.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    });
  }
}
