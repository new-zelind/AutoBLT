import verify from "../behaviors/verify";
import Command, { Permissions } from "../lib/command";
import { GuildMember } from "discord.js";

export default Command({
  names: ["verify"],

  documentation: {
    description: "Manually starts verification for a member.",
    group: "ADMIN",
    usage: "verify <user : @ mention>",
  },

  check: Permissions.admin,

  exec(message) {
    if (!message.mentions.members) return;

    message.mentions.members.forEach((member: GuildMember) => {
      verify(member);
    });
  },
});
