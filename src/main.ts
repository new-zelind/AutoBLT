import {GuildMember, PartialGuildMember} from "discord.js";
import { client } from "./client";
import { handle, isCommand, RESPONSES } from "./lib/command";
import {report, information} from "./lib/report";

// Behaviors
import verify from "./behaviors/verify";
import "./behaviors/easterEggs";

// Load all commands
import "./commands";
import { handleMessage, addMessageHandler } from "./lib/message";

//array of statuses for the bot
/*const statuses = [
  "the front desk",
  "the server",
  "and waiting",
  "ByrnesBot",
  "TigerFlix",
  "Football",
  "some training videos",
  "Vexbot",
  "the residents",
  "ERRORS",
];*/

client.on("ready", () => {

  //whoops, something broke
  if (!client.user) return;

  console.log(`${client.user.tag} is online!`);

  //automatically update status every 5 minutes
  /*setInterval(() => {
    const index = Math.floor(Math.random() * (statuses.length - 1));
    client.user?.setActivity(statuses[index], { type: "WATCHING" });
  }, 300000);*/
  client.user.setActivity("BLACK LIVES MATTER", {type: "PLAYING"});
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
    console.log(`Started auto-verify for ${member.user?.username}#${member.user?.discriminator}`);
    verify(member);
  }
);

// All message handlers
client.on("message", handleMessage);

//error handling
const reporter = report(client);
process.on("uncaughtException", (error:Error) => reporter(error));
process.on("unhandledRejection", (error:Error) => reporter(error));
