import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed } from "../../utils/discord";
import { EMAIL_REGEX, MAX_PENDING_ALLOWED } from "../../constants";
import { domainMatches } from "../../utils/general";
import { cleanUpPending } from "../../utils/database";

const data = new SlashCommandBuilder()
  .setName("send-code")
  .setDescription("Sends a code to to email provided to verify")
  .addStringOption((option) =>
    option
      .setName("email")
      .setDescription("The email that will recieve the code")
      .setRequired(true),
  );

async function execute(interaction: CommandInteraction) {
  const botUser = interaction.client.user;
  const email = interaction.options.get("email")?.value?.toString();
  const userId = interaction.user.id;
  const db = DiscordDatabase.getInstance();

  if (email) {
    try {
      // clean up expired entries
      cleanUpPending();

      // checks if already awaiting verification
      if (await db.getPendingEmail(email, userId)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Awaiting Verification")
              .setDescription(
                `This email is already awaiting verification.\n\nIf you don't see anything, please check your spam folder.`,
              ),
          ],
        });
      }

      // checks if user has multiple verfications going
      const userPending = await db.getPending(userId);
      if (userPending.length >= MAX_PENDING_ALLOWED) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Verification Limit Reached")
              .setDescription(
                `You currently have ${userPending.length} pending verifications.\n\nPlease wait until one or more expires.`,
              ),
          ],
        });
      }

      // checks if email is valid
      if (!EMAIL_REGEX.test(email)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Email Not Valid")
              .setDescription(`This email is not a valid email address.`),
          ],
        });
      }

      // checks if email fits one of the verified domains
      const domainList = await db.getDomains();
      if (!domainList.some((domain) => domainMatches(domain.domain, email))) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Email Not Valid")
              .setDescription(`This email is not accepted for verification.`),
          ],
        });
      }

      // add new entry
      const code = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

      await db.addPending(email, userId, code);

      // TODO: SEND EMAIL WITH CODE HERE

      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Sent Verification")
            .setDescription(
              `The email \`${email}\` was sent a verification code.\n\nIf you don't see anything, please check your spam folder.`,
            ),
        ],
      });
    } catch (error) {
      console.error(`Error verifiying email ${email}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)] });
}

export { data, execute };
