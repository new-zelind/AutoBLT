import discord, {
  Client,
  DiscordAPIError,
  Collection,
  GuildManager,
  GuildMember,
  PartialGuildMember,
} from "discord.js";
import { client } from "./client";
import { handle, isCommand, RESPONSES } from "./lib/command";

// Behaviors
import verify from "./behaviors/verify";

// Load all commands
import "./commands";
import { handleMessage, addMessageHandler } from "./lib/message";

//array of statuses for the bot
const statuses = [
  "Issuing keys",
  "Working the front desk",
  "Watching over the server",
  "Judging ByrnesBot",
  "Browsing TigerFlix",
  "Watching sports highlights",
  "THE CAKE IS NOT A LIE",
  "Finishing some training videos",
  "Writing an IR :/",
  "Poking Vexbot",
];

client.on("ready", () => {

  //whoops, something broke
  if (!client.user) return;

  console.log(`${client.user.tag} is online!`);

  //automatically update status every minute
  setInterval(() => {
    const index = Math.floor(Math.random() * (statuses.length - 1));
    client.user?.setActivity(statuses[index], { type: "CUSTOM_STATUS" });
  }, 60000);
});

// Ignore bot commands
addMessageHandler((message) => message.author.bot);

// Handle commands next
addMessageHandler(handle);

// Command editing
client.on("messageUpdate", (old, current) => {
  // Don't consider bot messages
  if (old.author?.bot) {
    return false;
  }

  // If the old message was a command, delete the old response
  if (isCommand(old) && RESPONSES.has(old)) {
    RESPONSES.get(old)?.delete();
  }

  return handle(current);
});

//verify upon entry
client.on(
  "guildMemberAdd",
  async (member: GuildMember | PartialGuildMember) => {
    verify(member);
  }
);

// All message handlers
client.on("message", handleMessage);

//error handling
process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);
