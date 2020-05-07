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

// Load all commands
import "./commands";

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

// Handle commands
client.on("message", handle);

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
client.on("guildMemberAdd", (member: GuildMember) => {
  console.log(`Started verification for ${member.id}`);
  verify(member);
});

//error handling
process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);
