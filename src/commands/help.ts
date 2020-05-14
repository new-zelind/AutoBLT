import Command, {
  Permissions,
  REGISTRY,
  PREFIX,
  CommandConfiguration,
} from "../lib/command";
import { Message } from "discord.js";

export const HelpCommand = Command({
  names: ["help"],
  documentation: {
    description: "Well, you found this, didn\'t you?",
    usage: "help",
    group: "META",
  },

  check: Permissions.all,
  async exec(message: Message) {
    // Let's organize the commands into their group
    const groups: {
      [group: string]: CommandConfiguration[];
    } = {};

    // Go through each command
    for (const [name, command] of REGISTRY) {
      
      // Get rid of all aliases
      if (name !== command.names[0]) continue;

      // Place it into its group
      const group = command.documentation.group.toUpperCase();

      // If the group exists already, push the command into the group
      // Otherwise, make a new group
      if (groups[group]) groups[group].push(command);
      else groups[group] = [command];
    }

    // Build the output
    let body = "Here\'s a list of my commands:";

    // List all of the command channels
    for (const [name, commands] of Object.entries(groups)) {
      body += `\n\n__**${name}**__:\n`;

      for (const command of commands) {
        body += command.names.map((n) => `*${n}*`).join(" or ");  //Append command name in italics
        body += ": " + command.documentation.description + " ";   //Append description
        body += `\n     Syntax: \`${PREFIX[0]}${command.documentation.usage}\`\n`; //append syntax on next line
      }
    }

    body += "\nPlease keep bot usage in _#bot-commands_!";

    // If the body is too big, we need to handle it in chunks
    async function postMessage(chunk: string) {
      if (chunk.length > 1900) {
        for (let i = 0; i < chunk.length; i += 1900) {
          const subchunk = chunk.slice(i, i + 1900);
          await postMessage(subchunk);
        }
      }
      else return message.channel.send(chunk);
    }

    return postMessage(body);
  },
});
