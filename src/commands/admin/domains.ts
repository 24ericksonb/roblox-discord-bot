import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";
import { getDomainList } from "../../utils/database";

const data = new SlashCommandBuilder()
  .setName("domains")
  .setDescription("Lists all domains from the domain list")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction, botUser: User) {
  const domains = await getDomainList();

  const description = domains
    ? `The following domains are verified:\n\n${domains}`
    : "There are currently no domains verified.";

  try {
    return await interaction.reply({
      embeds: [generateEmbed(botUser).setTitle("Verified Domains").setDescription(description)],
    });
  } catch (error) {
    console.error(`Error retrieving domains. Error: ${error}`);
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
