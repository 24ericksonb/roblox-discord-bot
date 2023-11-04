import { EmbedBuilder, Guild, User } from "discord.js";

export async function getRole(guild: Guild, name: string) {
  const roles = await guild.roles.fetch();
  const role = roles?.find((r) => r.name === name);
  return role;
}

export function getOptionValue(options: any, name: string) {
  const commandOption = options.get(name);
  if (!commandOption) return null;
  return commandOption.value;
}

export function getBaseEmbed(title: string, description: string, user: User) {
  return new EmbedBuilder()
    .setColor(0x121110)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp()
    .setFooter({
      text: user.displayName,
      iconURL: user.displayAvatarURL(),
    });
}
