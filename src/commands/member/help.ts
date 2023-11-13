import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { generateEmbed } from "../../utils/discord";

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
				Sends a verification code to the specified email address. Limited to certain domains and only one verification per user at a time.\n
				\`/verify <code>\`
				Verifies the code received from the email. Maximum of three failed attempts before you have to send a new code.
				`,
        ),
    ],
    ephemeral: true,
  });
}

export { data, execute };
