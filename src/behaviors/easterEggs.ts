import { addMessageHandler } from "../lib/message";
import { client } from "../client";
import { Message } from "discord.js";

const fuckYou:string[] = [
  "Fuck you too! 😠",
  "No, but thanks for the offer, I think?.",
  "😳",
  "What did I do to you?",
  "Not cool!",
  "Fuck you!",
  "Should I be flattered?",
  "Here, you might need one of these:\nhttps://cm.maxient.com/reportingform.php?ClemsonUniv&layout_id=1",
  "...",
  "I'm confused..."
]

//React with angry ping emote when pinged
addMessageHandler((message) => {
  if (!client.user || !message.guild) return false;
  if (!message.mentions.users.has(client.user.id)) return false;
  message.react("💢");    
  return false
});

addMessageHandler((message) => {
  if(!client.user) return false;
  if(!message.content.includes("cake" || "🎂")) return false;
  message.react("👀");  
  return true;
});

addMessageHandler((message) => {
  if(!client.user || !message.mentions.users.has(client.user.id)){
    return false;
  }
  if(!message.content.includes("fuck you")) return false;

  message.channel.send(
    `${fuckYou[Math.floor(Math.random() * (fuckYou.length - 1))]}`
  );

  return false;
});
