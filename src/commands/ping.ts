import Command, { Permissions } from "../lib/command";
import { Message } from "discord.js";

export default Command({
  names: ["ping"],

  check: Permissions.all,
  
  documentation: {
    description: "Check the Heartbeat of the bot.",
    group: "META",
    usage: "ping",
  },

  async exec(message: Message, args: string[]) {
    return message.channel.send("Pong!");
  },
});
