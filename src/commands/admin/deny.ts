import {
  CommandInteraction,
  Guild,
  GuildMember,
  GuildMemberRoleManager,
  PermissionFlagsBits,
  Role,
  SlashCommandBuilder,
  User,
} from "discord.js";
import { getBaseEmbed, getRole } from "../../utils/discord";
import { UNVERIFIED_ROLE, VERIFIED_ROLE } from "../../constants";

const data = new SlashCommandBuilder()
  .setName("reject")
  .setDescription("Rejects the verification of the server member")
  .addMentionableOption((option) =>
    option
      .setName("member")
      .setDescription("The server member to be rejected")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const member = interaction.options.getMember("member") as GuildMember;
  const caller = interaction.member?.user as User;

  try {
    const guild = interaction.guild as Guild;
    const verifiedRole = (await getRole(guild, VERIFIED_ROLE)) as Role;
    const unverifiedRole = (await getRole(guild, UNVERIFIED_ROLE)) as Role;

    if (member.roles.cache.some((role) => role.name === VERIFIED_ROLE)) {
      await (member.roles as GuildMemberRoleManager).remove(verifiedRole);
    }

    if (!member.roles.cache.some((role) => role.name === UNVERIFIED_ROLE)) {
      await (member.roles as GuildMemberRoleManager).add(unverifiedRole);
    }

    const applicantMessage = getBaseEmbed(
      "Verification Failed",
      "Please resubmit with new or updated information",
      caller,
    );

    const responseMessage = getBaseEmbed(
      "Rejection Successful",
      `${member} was notified about the failed verification.`,
      caller,
    );

    await member.user.send({ embeds: [applicantMessage] });

    interaction.reply({ embeds: [responseMessage] });
  } catch (error) {
    console.error(error);

    const message = getBaseEmbed(
      "Rejection Failed",
      "An error occured. Please try again later...",
      caller,
    );

    interaction.reply({ embeds: [message] });
  }
}

export { data, execute };
