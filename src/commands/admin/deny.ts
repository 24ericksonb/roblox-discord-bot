import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { getOptionValue } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("deny")
  .setDescription("Denies the verification of the server member")
  .addMentionableOption((option) =>
    option
      .setName("member")
      .setDescription("The server member to be denied")
      .setRequired(true),
  )
  .addStringOption((option) =>
    option
      .setName("reason")
      .setDescription("The reason for being denied")
      .setRequired(false),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const member = interaction.options.getMember("member") as GuildMember;

  try {
    if (member.roles.cache.some((role) => role.name === "Verified")) {
      const responseMessage = new EmbedBuilder()
        .setColor(0x121110)
        .setTitle("Verification Status")
        .setDescription(`${member} is already verified.`)
        .setTimestamp()
        .setFooter({
          text: interaction.user.displayName,
          iconURL: member.user.displayAvatarURL(),
        });

      interaction.reply({ embeds: [responseMessage] });
    } else {
      const applicantMessage = new EmbedBuilder()
        .setColor(0x162227)
        .setTitle("Verification Failed")
        .setDescription("Please resubmit with new or updated information")
        .addFields({
          name: "Reason",
          value: getOptionValue(interaction.options, "reason") || "Not given",
        })
        .setTimestamp()
        .setFooter({
          text: interaction.user.displayName,
          iconURL: member.user.displayAvatarURL(),
        });

      const responseMessage = new EmbedBuilder()
        .setColor(0x121110)
        .setTitle("Verification Status")
        .setDescription(`${member} was successfully verfied.`)
        .setTimestamp()
        .setFooter({
          text: interaction.user.displayName,
          iconURL: member.user.displayAvatarURL(),
        });

      await member.user.send({ embeds: [applicantMessage] });

      interaction.reply({ embeds: [responseMessage] });
    }
  } catch (error) {
    console.error(error);
    const responseMessage = new EmbedBuilder()
      .setColor(0x121110)
      .setTitle("Verification Status")
      .setDescription("Something went wrong. Please try again later...")
      .setTimestamp()
      .setFooter({
        text: interaction.user.displayName,
        iconURL: member.user.displayAvatarURL(),
      });

    interaction.reply({ embeds: [responseMessage] });
  }
}

export { data, execute };
