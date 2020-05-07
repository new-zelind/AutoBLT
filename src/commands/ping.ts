import Command, { Permissions } from "../lib/command";
import { Message } from "discord.js";

export default Command({
  names: ["ping"],

  check: Permissions.all,
  async exec(message: Message, args: string[]) {
    return message.channel.send("Pong!");
  },

  documentation: {
    description: "Heartbeat",
    group: "Bot",
    usage: "ping",
  },
});
