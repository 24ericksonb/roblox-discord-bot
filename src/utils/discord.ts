import { EmbedBuilder, User } from "discord.js";
// import { clientUser } from "..";

export function generateEmbed(user: User): EmbedBuilder {
  return new EmbedBuilder().setColor(0x121110).setTimestamp().setFooter({
    text: user.displayName,
    iconURL: user.displayAvatarURL(),
  });
}

export function generateErrorEmbed(user: User): EmbedBuilder {
  return generateEmbed(user)
    .setTitle("Error")
    .setDescription("Something went wrong... Please contact an admin!");
}
