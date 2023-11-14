import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";
import { getEmailList } from "../../utils/database";

const data = new SlashCommandBuilder()
  .setName("blacklist")
  .setDescription("Lists all email on the blacklist")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction, botUser: User) {
  const emails = await getEmailList();

  try {
    return await interaction.reply({
      embeds: [
        generateEmbed(botUser)
          .setTitle("Blacklisted Emails")
          .setDescription(`The following emails are blacklisted:\n\n${emails}`),
      ],
    });
  } catch (error) {
    console.error(`Error retrieving emails. Error: ${error}`);
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
