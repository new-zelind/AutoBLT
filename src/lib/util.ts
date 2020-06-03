import { Message, MessageEmbed, PartialMessage } from "discord.js";

export function code(text: string) {
  return `\`\`\`${text}\`\`\``;
}

export function inline(text: string) {
  return `\`${text}\``;
}

export function escape(text: string) {
  return (text + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}

export function makeEmbed(message?: Message | PartialMessage) {
  const embed = new MessageEmbed().setTimestamp();

  if (message) {
    const invoker =
      message.channel.type === "text"
        ? message.member?.displayName
        : message.author?.username;
    embed.setFooter(`Invoked by ${invoker}`);
  }

  return embed;
}
