import discord, { Client, DiscordAPIError, Collection } from "discord.js";
import { STATUS_CODES } from "http";
import { client } from "./client";

import verify from "./behaviors/verify";

//import commands from folder
import * as botCommands from "./commands";
const commands = new Map();

Object.keys(botCommands).map((key) => {
  commands.set(botCommands[key].name, botCommands[key]);
});

//array of statuses for the bot
const statuses = [
  "over the server",
  "from afar",
  "the front desk",
  "Clemson Football",
  "ByrnesBot",
  "for errors",
  "TigerFlix",
  "sports highlights",
  "y'all",
  "training videos",
  "and waiting",
  "my residents",
];

const prefix = "*";

client.on("ready", () => {
  console.log("AutoBLT is online!");

  //automatically update status every minute
  //For some reason, this keep breaking unless I have a try/catch structure
  try {
    setInterval(() => {
      const index = Math.floor(Math.random() * (statuses.length - 1));
      client.user.setActivity(statuses[index], { type: "WATCHING" });
    }, 60000);
  } catch {
    client.user.setActivity("with errors :/", { type: "PLAYING" });
  }
});

client.on("message", (msg) => {
  //return if not a command invocation
  if (!msg.content.startsWith(prefix)) return;

  //get the command and arguments from the message.
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  console.log(`Command ${command} initiated`);

  //Can't execute a command we don't have.
  if (!commands.has(command)) {
    msg.channel.send("Error: unrecognized command.");
    return;
  }

  //try/catch structure for commmand execution.
  try {
    commands.get(command).execute(msg, args);
  } catch {
    msg.channel.send(`Error executing ${command}. Please try again later.`);
  }
});

client.on("guildMemberAdd", (member) => {
  console.log(`Started verification for ${member.id}`);
  verify(member);
});
