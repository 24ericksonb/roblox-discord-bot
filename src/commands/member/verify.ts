import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";
import { cleanUpPending } from "../../utils/database";
import { MAX_ATTEMPTS } from "../../constants";

const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Verifies the your account")
  .addStringOption((option) =>
    option.setName("email").setDescription("The email that recieved the code").setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("code").setDescription("The code recieved from the email").setRequired(true),
  );

async function execute(interaction: CommandInteraction) {
  const botUser = interaction.client.user;
  const email = interaction.options.get("email")?.value?.toString();
  const code = interaction.options.get("code")?.value?.toString();
  const userId = interaction.user.id;
  const db = DiscordDatabase.getInstance();

  if (email && code) {
    try {
      // clean up expired entries
      cleanUpPending();

      const pending = await db.getPendingEmail(email, userId);

      // checks for null pending
      if (!pending) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("No Pending Verifications")
              .setDescription(
                `There is no pending verification for this email.\n\nPlease use \`/send-code <email>\` to start verification.`,
              ),
          ],
        });
      }

      // checks for max tries
      if (pending.attempts >= MAX_ATTEMPTS) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Attempt Limit")
              .setDescription(`You have reached the maximum amount of tries for this email.`),
          ],
        });
      }

      // checks for bad code
      if (pending.code != code) {
        await db.incrementAttempts(pending.id);
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Invalid Code")
              .setDescription(`That was not the correct code sent to this email.`),
          ],
        });
      }

      // TODO: ADD VERIFIED ROLE
    } catch (error) {
      console.error(`Error verifiying with code ${code}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
