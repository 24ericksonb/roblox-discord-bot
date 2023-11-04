import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("verify")
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
  );

async function execute(interaction: CommandInteraction) {
  await interaction.reply("Pong!");
}

export { data, execute };
