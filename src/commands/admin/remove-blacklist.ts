import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("remove-blacklist")
  .setDescription("Removes an email from the blacklist")
  .addStringOption((option) =>
    option.setName("email").setDescription("The address of the email").setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction, botUser: User) {
  const email = interaction.options.get("email")?.value?.toString();
  const db = DiscordDatabase.getInstance();

  if (email) {
    try {
      if (await db.getEmail(email)) {
        await db.deleteEmail(email);
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Removed Email")
              .setDescription(
                `The email \`${email}\` was successfully removed from the blacklist.`,
              ),
          ],
        });
      }
      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Email Not Found")
            .setDescription(`The email \`${email}\` was not found in the blacklist.`),
        ],
      });
    } catch (error) {
      console.error(`Error removing email ${email}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
