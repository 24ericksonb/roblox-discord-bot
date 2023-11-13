import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { generateEmbed } from "../../utils/discord";
import { MAX_ATTEMPTS } from "../../constants";

const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Sends a help message about the commands");

async function execute(interaction: CommandInteraction) {
  const botUser = interaction.client.user;

  return await interaction.reply({
    embeds: [
      generateEmbed(botUser)
        .setTitle("Command Help")
        .setDescription(
          `
          \`/send-code <email>\`
          Sends a verification code to the specified email address. This command is limited to certain domains and each user can request only one verification at a time.

          \`/verify <code>\`
          Verifies the code received from the email. You have a maximum of ${MAX_ATTEMPTS} attempts to enter the correct code before you need to request a new one.
          `,
        ),
    ],
    ephemeral: true,
  });
}

export { data, execute };
