import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";
import { getDomainList } from "../../utils/database";

const data = new SlashCommandBuilder()
  .setName("domains")
  .setDescription("Lists all domains from the domain list")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const botUser = interaction.client.user;
  const domains = await getDomainList();

  try {
    return await interaction.reply({
      embeds: [
        generateEmbed(botUser)
          .setTitle("Verified Domains")
          .setDescription(`The following domains are verified:\n\n${domains}`),
      ],
    });
  } catch (error) {
    console.error(`Error retrieving domains. Error: ${error}`);
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
