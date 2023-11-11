import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { ValidationError } from "sequelize";
import { DOMAIN_REGEX } from "../../constants";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("add-domain")
  .setDescription("Adds a domain to the domain list")
  .addStringOption((option) =>
    option.setName("domain").setDescription("The name of the domain").setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const domain = interaction.options.get("domain")?.value?.toString();
  const userId = interaction.member?.user.id;

  if (domain && userId) {
    if (!DOMAIN_REGEX.test(domain)) {
      return await interaction.reply({
        embeds: [
          generateEmbed()
            .setTitle("Domain Not Valid")
            .setDescription(`The domain \`${domain}\` is not a valid email domain.`),
        ],
      });
    }

    try {
      await DiscordDatabase.getInstance().addDomain(domain, userId);
      return await interaction.reply({
        embeds: [
          generateEmbed()
            .setTitle("Added Domain")
            .setDescription(`The domain \`${domain}\` was successfully added to the verfied list.`),
        ],
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return await interaction.reply({
          embeds: [
            generateEmbed()
              .setTitle("Domain Verified")
              .setDescription(`The domain \`${domain}\` was already verfied.`),
          ],
        });
      }
      console.error(`Error adding domain ${domain}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed()] });
}

export { data, execute };
