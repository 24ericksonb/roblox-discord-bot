import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
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
  const botUser = interaction.client.user;
  const domain = interaction.options.get("domain")?.value?.toString();
  const userId = interaction.user.id;
  const db = DiscordDatabase.getInstance();

  // check regex for valid domain
  if (domain) {
    if (!DOMAIN_REGEX.test(domain)) {
      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Domain Not Valid")
            .setDescription(`The domain \`${domain}\` is not a valid email domain.`),
        ],
      });
    }

    try {
      if (await db.getDomain(domain)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Domain Verified")
              .setDescription(`The domain \`${domain}\` was already verfied.`),
          ],
        });
      }

      await db.addDomain(domain, userId);
      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Added Domain")
            .setDescription(`The domain \`${domain}\` was successfully added to the verfied list.`),
        ],
      });
    } catch (error) {
      console.error(`Error adding domain ${domain}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
