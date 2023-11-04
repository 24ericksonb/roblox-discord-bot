import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("Rolls a number between 1-100");

async function execute(interaction: CommandInteraction) {
  const number = Math.floor(Math.random() * 100) + 1;
  await interaction.reply(`${interaction.member} rolled ${number}!`);
}

export { data, execute };
