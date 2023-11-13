import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { generateEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("admin-help")
  .setDescription("Sends a help message about the commands")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction) {
  const botUser = interaction.client.user;

  return await interaction.reply({
    embeds: [
      generateEmbed(botUser)
        .setTitle("Admin Command Help")
        .setDescription(
          `
          \`/domains\`
          Lists all current domains that can be verified.
          
          \`/add-domain <domain>\`
          Adds a new domain to the domain list. Duplicate domains are not allowed and you can use wildcards with * (e.g., *.edu).
          
          \`/remove-domain <domain>\`
          Removes a domain from the domain list. You can only remove domains that are currently on the domain list.
				  `,
        ),
    ],
    ephemeral: true,
  });
}

export { data, execute };
