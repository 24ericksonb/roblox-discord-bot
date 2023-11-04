import {
  CommandInteraction,
  Guild,
  GuildMember,
  GuildMemberRoleManager,
  PermissionFlagsBits,
  Role,
  SlashCommandBuilder,
} from "discord.js";
import { getOptionValue, getRole } from "../../utils/discord";

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
  try {
    const guild = interaction.guild as Guild;
    const role = (await getRole(guild, "Verified")) as Role;
    const member = interaction.options.getMember("member") as GuildMember;
    const name = getOptionValue(interaction.options, "name") as string;

    await member.setNickname(name);

    if (member.roles.cache.some((role) => role.name === "Verified")) {
      interaction.reply(`${member} is already verified.`);
    } else {
      await (member.roles as GuildMemberRoleManager).add(role);
      await member.user.send("You have be sucessfully verified!");

      interaction.reply(`You have successfully verifed ${member}.`);
    }
  } catch (error) {
    console.error(error);
    interaction.reply(`Something went wrong. Please try again later...`);
  }
}

export { data, execute };
