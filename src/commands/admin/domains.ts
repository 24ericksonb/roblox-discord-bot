import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import Domain from "../../database/models/domain";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("domains")
  .setDescription("Lists all domains from the domain list")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const botUser = interaction.client.user;

  try {
    const domainList = await DiscordDatabase.getInstance().getDomains();
    const domainsString =
      domainList.length > 0
        ? domainList.map((domainObj: Domain) => `\`${domainObj.domain}\``).join(", ")
        : "None";
    return await interaction.reply({
      embeds: [
        generateEmbed(botUser)
          .setTitle("Verified Domains")
          .setDescription(`The following domains are verified:\n\n${domainsString}`),
      ],
    });
  } catch (error) {
    console.error(`Error retrieving domains. Error: ${error}`);
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
