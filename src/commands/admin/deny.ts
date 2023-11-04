import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("deny")
  .setDescription("Denies the verification of the server member")
  .addMentionableOption((option) =>
    option
      .setName("member")
      .setDescription("The server member to be denied")
      .setRequired(true),
  );

async function execute(interaction: CommandInteraction) {
  await interaction.reply("Pong!");
}

export { data, execute };
