import {
  Message as FullMessage,
  TextChannel,
  PartialMessage,
} from "discord.js";
import { makeEmbed } from "./util";

const owner = "";
export const PREFIX = ["*"];

type Message = FullMessage | PartialMessage;

export function isCommand(message: Message) {
  return PREFIX.includes(message.content[0]);
}

// Redefinition of Command object; adds more functionalilty.
export interface CommandConfiguration {
  
  //the name of the command
  names: string[];

  // Documentation for *help command
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

export function matchCommand(message: Message) {
  const name = message.content.slice(1).split(" ")[0];

  if (!REGISTRY.has(name)) {
    return null;
  }

  return REGISTRY.get(name);
}

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

// Function to handle messages when sent
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

// Enforce role permission restricted-commands.
export const Permissions = {
  admin(message: Message) {
    return (
      message.channel.type === "text" &&
      message.member.hasPermission("ADMINISTRATOR")
    );
  },

  owner(message: Message) {
    return message.author.id === owner;
  },

  guild(message: Message) {
    return message.channel.type == "text";
  },

  dm(message: Message) {
    return message.channel.type === "dm";
  },

  env(parameter: string, value: any) {
    return (message: Message) => process.env[parameter] === value;
  },

  channel(name: string) {
    return (message: Message) => (message.channel as TextChannel).name === name;
  },

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
