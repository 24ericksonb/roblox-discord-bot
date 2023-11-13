import { EmbedBuilder, Guild, Role, User } from "discord.js";

export function generateEmbed(user: User): EmbedBuilder {
  return new EmbedBuilder().setColor(0x23242a).setTimestamp().setFooter({
    text: user.displayName,
    iconURL: user.displayAvatarURL(),
  });
}

export function generateErrorEmbed(user: User): EmbedBuilder {
  return generateEmbed(user)
    .setTitle("Error")
    .setDescription("Something went wrong... Please contact an admin!");
}

export async function getRole(guild: Guild, name: string): Promise<Role> {
  const roles = await guild.roles.fetch();
  if (!roles) throw Error("Roles not found...");
  const role = roles.find((r) => r.name === name);
  if (!role) throw Error("Role not found...");
  return role;
}
