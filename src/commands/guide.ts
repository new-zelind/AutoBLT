import Command, { Permissions } from "../lib/command";
import { Message } from "discord.js";

export default Command({
  names: ["guide"],

  documentation: {
    description: "Returns a PDF of _The Guide for RAs_.",
    group: "GENERAL",
    usage: "guide",
  },

  check: Permissions.all,
  
  async exec(message: Message, args: string[]) {
    return message.channel.send({
      files: [
        {
          attachment: "./src/extern/theGuide.pdf",
          name: "theGuide.pdf",
        },
      ],
    });
  },
});
