import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("remove-domain")
  .setDescription("Removes a domain from the domain list")
  .addStringOption((option) =>
    option.setName("domain").setDescription("The name of the domain").setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction, botUser: User) {
  const domain = interaction.options.get("domain")?.value?.toString();
  const db = DiscordDatabase.getInstance();

  if (domain) {
    try {
      if (await db.getDomain(domain)) {
        await db.deleteDomain(domain);
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Removed Domain")
              .setDescription(
                `The domain \`${domain}\` was successfully removed from the verified list.`,
              ),
          ],
        });
      }
      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Domain Not Found")
            .setDescription(`The domain \`${domain}\` was not found in the verified list.`),
        ],
      });
    } catch (error) {
      console.error(`Error removing domain ${domain}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
