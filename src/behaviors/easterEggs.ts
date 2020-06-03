import { addMessageHandler } from "../lib/message";
import { client } from "../client";
import { PREFIX, isCommand } from "../lib/command";
import { code } from "../lib/util";
import { TextChannel } from "discord.js";

//React with angry ping emote when pinged
addMessageHandler((message) => {
  if (!client.user || !message.guild) return false;
  if (message.mentions.users.has(client.user.id)) {
    const pingEmote = message.guild.emojis.cache.find(
      (emoji) => emoji.name === "ping"
    );
    if (pingEmote) {
      message.react(pingEmote);
    }
    return true;
  } else return false;
});

addMessageHandler((message) => {
  if (!client.user) return false;

  if (!message.mentions.users.has(client.user.id)) return false;
  if (!message.content.includes("fuck you")) return false;
  message.reply("Well fuck you too! :rage:");
  return false;
});
