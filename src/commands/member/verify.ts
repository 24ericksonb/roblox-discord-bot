import {
  ChannelType,
  CommandInteraction,
  Guild,
  GuildMember,
  Role,
  SlashCommandBuilder,
  User,
} from "discord.js";
import { DiscordDatabase } from "../../database/database";
import { generateEmbed, generateErrorEmbed, getRole } from "../../utils/discord";
import { cleanUpPending, getExpireInMinutes } from "../../utils/database";
import {
  MAX_ATTEMPTS,
  NOT_VERIFIED_ROLE,
  VERIFIED_LOG_CHANNEL,
  VERIFIED_ROLE,
} from "../../constants";

const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Verifies the your account")
  .addStringOption((option) =>
    option.setName("code").setDescription("The code recieved from the email").setRequired(true),
  );

async function execute(interaction: CommandInteraction, botUser: User) {
  const code = interaction.options.get("code")?.value?.toString();
  const userId = interaction.user.id;
  const db = DiscordDatabase.getInstance();
  const guild = interaction.guild as Guild;
  const member = interaction.member as GuildMember;

  if (code) {
    try {
      // clean up expired entries
      await cleanUpPending();

      const verifiedRole = await getRole(guild, VERIFIED_ROLE);
      const notVerifedRole = await getRole(guild, NOT_VERIFIED_ROLE);

      // checks for verified role
      if (member.roles.cache.some((e: Role) => e === verifiedRole)) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Already Verified")
              .setDescription(`You already have the ${verifiedRole} role!`),
          ],
          ephemeral: true,
        });
      }

      const pending = await db.getPending(userId);

      // checks for null pending
      if (!pending) {
        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("No Pending Verifications")
              .setDescription(
                `You have no pending verifications.\n\nPlease use \`/send-code <email>\` to start verification.`,
              ),
          ],
          ephemeral: true,
        });
      }

      // checks for max tries
      if (pending.attempts >= MAX_ATTEMPTS) {
        const minutesTilExp = getExpireInMinutes(pending);

        return await interaction.reply({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Attempt Limit")
              .setDescription(
                `You have reached the maximum amount of tries for this email.\n\nPlease wait **${minutesTilExp}** minutes until the verification expires.`,
              ),
          ],
          ephemeral: true,
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
          ephemeral: true,
        });
      }

      // process verification
      await db.deletePending(pending.id);
      await member.roles.add(verifiedRole);
      await member.roles.remove(notVerifedRole);

      // sends message to log channel
      const logChannel = await interaction.client.channels.fetch(VERIFIED_LOG_CHANNEL);
      if (logChannel && logChannel.type == ChannelType.GuildText) {
        await logChannel.send({
          embeds: [
            generateEmbed(botUser)
              .setTitle("Member Verified")
              .setDescription(`${member} has verified with the email \`${pending.email}\``),
          ],
        });
      }

      return await interaction.reply({
        embeds: [
          generateEmbed(botUser)
            .setTitle("Successfully Verified")
            .setDescription(`You have been successfully verified!`),
        ],
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error verifiying with code ${code}. Error: ${error}`);
    }
  }

  return await interaction.reply({ embeds: [generateErrorEmbed(botUser)], ephemeral: true });
}

export { data, execute };
