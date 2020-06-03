import discord, {
  Client,
  DiscordAPIError,
  Collection,
  GuildManager,
  GuildMember,
} from "discord.js";
import { client } from "./client";
import { handle, isCommand, RESPONSES } from "./lib/command";

// Behaviors
import verify from "./behaviors/verify";
import "./behaviors";

// Load all commands
import "./commands";
import { handleMessage, addMessageHandler } from "./lib/message";

//array of statuses for the bot
const statuses = [
  "over the server",
  "from afar",
  "the front desk",
  "Clemson Football",
  "ByrnesBot",
  "for segfaults",
  "TigerFlix",
  "sports highlights",
  "y'all",
  "training videos",
  "and waiting",
  "the residents",
  "vexbot",
];

const prefix = "*";

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);

  //automatically update status every minute
  //For some reason, this keep breaking unless I have a try/catch structure
  try {
    setInterval(() => {
      const index = Math.floor(Math.random() * (statuses.length - 1));
      client.user.setActivity(statuses[index], { type: "WATCHING" });
    }, 60000);
  } catch {
    client.user.setActivity("stuff break :/", { type: "PLAYING" });
  }
});

// Ignore bot commands
addMessageHandler((message) => message.author.bot);

// Handle commands next
addMessageHandler(handle);

// Command editing
client.on("messageUpdate", (old, current) => {
  // Don't consider bot messages
  if (old.author.bot) {
    return false;
  }

  // If the old message was a command, delete the old response
  if (isCommand(old) && RESPONSES.has(old)) {
    RESPONSES.get(old).delete();
  }

  return handle(current);
});

//verify upon entry
client.on("guildMemberAdd", (member: GuildMember) => {verify(member);});

// All message handlers
client.on("message", handleMessage);

//error handling
process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);