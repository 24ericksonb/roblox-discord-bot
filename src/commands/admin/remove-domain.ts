import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("remove-domain")
  .setDescription("Removes a domain from the domain list")
  .addStringOption((option) =>
    option.setName("domain").setDescription("The name of the domain").setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const domain = interaction.options.get("domain")?.value;

  if (domain) {
    try {
      if (await DiscordDatabase.getInstance().getDomain(domain.toString())) {
        await DiscordDatabase.getInstance().deleteDomain(domain.toString());
        return await interaction.reply({
          embeds: [
            generateEmbed()
              .setTitle("Removed Domain")
              .setDescription(
                `The domain \`${domain}\` was successfully removed from the verified list.`,
              ),
          ],
        });
      }
      return await interaction.reply({
        embeds: [
          generateEmbed()
            .setTitle("Domain Not Found")
            .setDescription(`The domain \`${domain}\` was not found in the verified list.`),
        ],
      });
    } catch (error) {
      console.error(`Error removing domain ${domain}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed()] });
}

export { data, execute };
