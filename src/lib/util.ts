import { Message, MessageEmbed, PartialMessage } from "discord.js";

/**
 * A function to embed in a code block.
 * @param text: The text to be embedded.
 * @return: text = ```[#text]```
 */
export function code(text: string) {
  return `\`\`\`${text}\`\`\``;
}

/**
 * A function to embed text inline.
 * @param text: The text to be embedded.
 * @return: text = `[#text]`
 */
export function inline(text: string) {
  return `\`${text}\``;
}

/**
 * Not sure what this does, but it's here to do something.
 * @param text: The text to have this shithousery applied.
 * @return: text = ???(#text)
 */
export function escape(text: string) {
  return (text + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}

/**
 * A function to standardize all RichEmbed objects sent by the bot.
 * @param message: An optional message to be embedded.
 * @return: A new embed object containing the original message, if one is
 *            supplied.
 */
export function makeEmbed(message?: Message | PartialMessage) {
  const embed = new MessageEmbed().setTimestamp();

  if (message) {
    const invoker =
      message.channel.type === "text"
        ? message.member.displayName
        : message.author.username;
    embed.setFooter(`Invoked by ${invoker}`);
  }

  return embed;
}
