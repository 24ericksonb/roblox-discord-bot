import { Guild } from "discord.js";

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
