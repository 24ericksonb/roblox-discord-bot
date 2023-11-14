import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { EMAIL_REGEX } from "../../constants";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("add-blacklist")
  .setDescription("Adds an email to the blacklist")
  .addStringOption((option) =>
    option.setName("email").setDescription("The address of the email").setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction, botUser: User) {
  const email = interaction.options.get("email")?.value?.toString();
  const db = DiscordDatabase.getInstance();

  // check regex for valid domain
  if (email) {
    if (!EMAIL_REGEX.test(email)) {
      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Email Not Valid")
            .setDescription(`The email \`${email}\` is not a valid email.`),
        ],
      });
    }

    try {
      if (await db.getEmail(email)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Email Blacklisted")
              .setDescription(`The email \`${email}\` is already blacklisted.`),
          ],
        });
      }

      await db.addEmail(email);
      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Added Email")
            .setDescription(`The email \`${email}\` was successfully added to the blacklist.`),
        ],
      });
    } catch (error) {
      console.error(`Error adding email ${email}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
