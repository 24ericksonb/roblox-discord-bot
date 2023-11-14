import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { generateEmbed } from "../../utils/discord";

const data = new SlashCommandBuilder()
  .setName("admin-help")
  .setDescription("Sends a help message about the commands")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(interaction: CommandInteraction, botUser: User) {
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

          \`/blacklist\`
          Lists all current emails that are on the blacklist.
          
          \`/add-blacklist <email>\`
          Adds a new email to the blacklist. Duplicate emails are not allowed.
          
          \`/remove-blacklist <email>\`
          Removes an email from the blacklist. You can only remove emails that are currently on the blacklist.
				  `,
        ),
    ],
    ephemeral: true,
  });
}

export { data, execute };
