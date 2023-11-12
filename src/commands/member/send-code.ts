import { CommandInteraction, Guild, GuildMember, Role, SlashCommandBuilder } from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed, getRole } from "../../utils/discord";
import { EMAIL_REGEX, VERIFIED_ROLE } from "../../constants";
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
  const guild = interaction.guild as Guild;
  const member = interaction.member as GuildMember;

  if (email) {
    try {
      // clean up expired entries
      cleanUpPending();

      const role = await getRole(guild, VERIFIED_ROLE);

      // checks for verified role
      if (member.roles.cache.some((e: Role) => e === role)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Already Verified")
              .setDescription(`You already have the ${role} role!`),
          ],
          ephemeral: true,
        });
      }

      // gets current pending
      const pending = await db.getPending(userId);

      // checks if user has an email pending
      if (pending) {
        // email is already pending
        if (pending.email == email) {
          return await interaction.reply({
            embeds: [
              generateEmbed(botUser)
                .setTitle("Awaiting Verification")
                .setDescription(
                  `This email is already awaiting verification.\n\nIf you don't see anything, please check your spam folder.`,
                ),
            ],
            ephemeral: true,
          });
        }
        // user already is verifying another email
        else if (pending.attempts > 0) {
          return await interaction.reply({
            embeds: [
              generateEmbed(botUser)
                .setTitle("Awaiting Verification")
                .setDescription(
                  `You already have an email you are verifying.\n\nPlease wait until that email verification expires.`,
                ),
            ],
            ephemeral: true,
          });
        }
      }

      // checks if email is valid
      if (!EMAIL_REGEX.test(email)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Email Not Valid")
              .setDescription(`This email is not a valid email address.`),
          ],
          ephemeral: true,
        });
      }

      // checks if email fits one of the verified domains
      const domainList = await db.getDomains();
      if (!domainList.some((domain) => domainMatches(domain.domain, email))) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Email Not Valid")
              .setDescription(`This email domain is not accepted for verification.`),
          ],
          ephemeral: true,
        });
      }

      const code = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

      if (pending) await db.deletePending(pending.id);
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
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error verifiying email ${email}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)], ephemeral: true });
}

export { data, execute };
