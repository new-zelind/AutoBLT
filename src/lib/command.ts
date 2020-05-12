import {
  Message as FullMessage,
  TextChannel,
  PartialMessage,
} from "discord.js";
import { makeEmbed } from "./util";

const zach = "286283133337206784";
const bren = "274004148276690944";
export const PREFIX = ["*"];

type Message = FullMessage | PartialMessage;

/**
 * Checks each message that could invoke a bot response.
 * @param message: The user's message that may contain a command.
 * @return true if the message contains a command invocation.
 *         false if the message does not contain a command invocation.
*/
export function isCommand(message: Message) {
  return PREFIX.includes(message.content[0]);
}

/**
 * Interface specification for each command. This is an extension of the Command
 * object provided by Discord.js, with a little more structure and functionality.
 * Each command will be an extension of this interface.
 * 
 * @defines
 *  names: The name of the command.
 *  documentation: Various information about the command.
 *    description: What the command does or returns.
 *    usage: The syntax for command invocation.
 *    group: How the command is grouped. (see ../commands/index.ts for more info)
 *    hidden: Whether or not the invoker has access to the command.
 *  check: Checks the highest role granted to the user to see if they have the
 *         appropriate permissions to use the command.
 *  fail: If #check fails, the alternate flow to take upon a failure.
 * 
 * @constraints 
 *  None
 * 
 * @initialization Ensures
 *   (names && (documentation) && check) == ""
 *   (*exec()) == NULL
*/
export interface CommandConfiguration {
  
  names: string[];

  documentation: {
    description: string;
    usage: string;
    group: string;
    hidden?: boolean;
  };

  // See if it's valid to use the command (see the Permissions object below)
  check: (message: Message) => boolean | Promise<boolean>;

  // If the check fails
  fail?: (message: Message) => void;

  // Execute the command
  exec(
    message: Message,
    args: string[]
  ): Promise<Message | Message[] | void> | void;
}

// Holds all the registered commands (with each name being mapped)
export const REGISTRY = new Map<string, CommandConfiguration>();

/**
 * Allows for invocations with a space between the prefix and command
 * @param message The user's message
 * @return null if the command doesn't exist in #REGISTRY.
 *         the command name if the command does exist in #REGISTRY
 */
export function matchCommand(message: Message) {
  const name = message.content.slice(1).split(" ")[0];

  if (!REGISTRY.has(name)) {
    return null;
  }

  return REGISTRY.get(name);
}

/**
 * Factory for creation of commands.
 * @param config The command as a CommandConfiguration object to be placed into
 *               #REGISTRY.
 * @return #config.
 */
export default function makeCommand(config: CommandConfiguration) {
  for (const name of config.names) {
    REGISTRY.set(name, config);
  }

  return config;
}

// Handles all of the commands we've already executed
export const RESPONSES = new Map<Message, Message>();

// Commands that are disabled go here
export const DISABLED = new Set<CommandConfiguration>();

/**
 * A function to handle all messages sent by any user.
 * @param message 
 * @return false if the command doesn't exist, the bot is the author, or if the
 *           command is disabled.
 *         true upon a successful command execution.
 */
export async function handle(message: Message): Promise<boolean> {
  
  // If the command doesn't exist, return. If the author is the bot, return false.
  if(!isCommand(message)) return false;
  if(message.author.id == "680135764667138167") return false;

  // Get the appropriate command, if it exists
  const command = matchCommand(message);
  if (!command) {
    message.channel.send(
      `Error: command \`${message.content.slice(1).split(" ")[0]}\` does not exist. Use \`${
        PREFIX[0]
      }help\` for a list of commands.`
    );
    return false;
  }

  // Check if the command is disabled
  const disabled = DISABLED.has(command);
  if (disabled && !Permissions.owner(message)) {
    return false;
  }

  // See if the command is allowed to be used by the permission system
  const allowed = await command.check(message);
  if (!allowed && command.fail) {
    command.fail(message);
    return true;
  }

  // Get the arguments
  const argv = message.content.split(" ").slice(1);

  // Start the timer (for when we edit the message later to indicate how long the command takes)
  const start = Date.now();

  // Execute the command
  const response = await command.exec(message, argv);

  // If the command gave us a response to track
  if (response) {
    const main = response instanceof Array ? response[0] : response;

    // Archive that resposne
    RESPONSES.set(message, main);

    // If there isn't any attached embeds, then edit the message itself
    if (main.embeds.length < 1) {
      main.edit(
        main.content +
          ` *(took ${Date.now() - start}ms${
            process.env["DEV"] ? " — DEV MODE" : ""
          })*`
      );

      // Otherwise get the last embed and edit it;
    } else {
      const embed = main.embeds[0];

      const replacement = makeEmbed(main)
        .setFooter(embed.footer.text)
        .setTitle(embed.title)
        .setColor(embed.color)
        .setDescription(embed.description)
        .setImage((embed.image || { url: undefined }).url)
        .setThumbnail((embed.thumbnail || { url: undefined }).url)
        .setTimestamp(new Date(embed.timestamp))
        .setURL(embed.url);

      if (embed.author) {
        replacement.setAuthor(embed.author);
      }

      replacement.fields = embed.fields;

      main.edit({ embed: replacement });
    }
  }

  return true;
}

/**
 * A function to check the permissions of the executer.
 * @return false if the user does not have the proper role permission to
 *           execute the command.
 *         true if the user has the proper role permissions to execute the
 *           command.
 */
export const Permissions = {

  //commands restricted to those with the administrator permission
  admin(message: Message) {
    return (
      message.channel.type === "text" &&
      message.member.hasPermission("ADMINISTRATOR")
    );
  },

  //command restricted to either developer
  owner(message: Message) {
    return (message.author.id === zach || message.author.id === bren);
  },

  //commands restricted to usage in text channels
  guild(message: Message) {
    return message.channel.type == "text";
  },

  //commands restricted to usage in dms
  dm(message: Message) {
    return message.channel.type === "dm";
  },

  //commands restricted by a specific dev-defined parameter,
    //located in the .env file. 
  env(parameter: string, value: any) {
    return (message: Message) => process.env[parameter] === value;
  },

  //commands restricted to a certain channel or channels
  channel(name: string) {
    return (message: Message) => (message.channel as TextChannel).name === name;
  },

  //commands with no restrictions
  all() {
    return true;
  },

  compose(...checks: ((message: Message) => boolean)[]) {
    return (message) =>
      checks.map((check) => check(message)).every((resp) => resp);
  },

  any(...checks: ((message: Message) => boolean)[]) {
    return (message) =>
      checks.map((check) => check(message)).some((resp) => resp);
  },
};
