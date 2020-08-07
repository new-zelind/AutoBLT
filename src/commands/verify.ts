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

  check: Permissions.any(
    Permissions.admin, Permissions.owner
  ),

  async fail(message){
    return message.channel.send("I'm afraid I can't do that.");
  },

  async exec(message) {
    if (!message.mentions.members) return;

    message.mentions.members.forEach((member: GuildMember) => {
      verify(member);
    });
  },
});
