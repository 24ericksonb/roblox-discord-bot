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
import { getBaseEmbed, getOptionValue, getRole } from "../../utils/discord";
import { ROLES } from "../../constants";

const data = new SlashCommandBuilder()
  .setName("approve")
  .setDescription("Approves the verification of the server member")
  .addMentionableOption((option) =>
    option
      .setName("member")
      .setDescription("The server member to be verified")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("The full name of the member")
      .setRequired(true),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const member = interaction.options.getMember("member") as GuildMember;
  const caller = interaction.member?.user as User;

  try {
    const guild = interaction.guild as Guild;
    const verifiedRole = (await getRole(guild, ROLES.VERIFIED)) as Role;
    const unverifiedRole = (await getRole(guild, ROLES.UNVERIFIED)) as Role;
    const name = getOptionValue(interaction.options, "name") as string;
    console.log(guild);
    await member.setNickname(name);

    if (member.roles.cache.some((role) => role.name === ROLES.UNVERIFIED)) {
      await (member.roles as GuildMemberRoleManager).remove(unverifiedRole);
    }

    if (!member.roles.cache.some((role) => role.name === ROLES.VERIFIED)) {
      await (member.roles as GuildMemberRoleManager).add(verifiedRole);

      const applicantMessage = getBaseEmbed(
        "Verification Successful",
        "You have be sucessfully verified!",
        caller,
      );

      await member.user.send({ embeds: [applicantMessage] });
    }

    const responseMessage = getBaseEmbed(
      "Approval Successful",
      `${member} was successfully verified.`,
      caller,
    );

    interaction.reply({ embeds: [responseMessage] });
  } catch (error) {
    console.error(error);

    const message = getBaseEmbed(
      "Approval Failed",
      "An error occured. Please try again later...",
      caller,
    );

    interaction.reply({ embeds: [message] });
  }
}

export { data, execute };
