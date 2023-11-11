import { EmbedBuilder } from "discord.js";
import { client } from "..";

export function generateEmbed(): EmbedBuilder {
  const baseEmbed = new EmbedBuilder().setColor(0x121110).setTimestamp();

  if (client.user) {
    baseEmbed.setFooter({
      text: client.user.displayName,
      iconURL: client?.user.displayAvatarURL(),
    });
  }

  return baseEmbed;
}

export function generateErrorEmbed(): EmbedBuilder {
  return generateEmbed()
    .setTitle("Error")
    .setDescription("Something went wrong... Please contact an admin!");
}
