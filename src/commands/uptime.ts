import Command, { Permissions } from "../lib/command";
import { Message } from "discord.js";
import { client } from "../client";
import { makeEmbed } from "../lib/util";

export default Command({
  names: ["uptime"],
  documentation: {
    description: "Check the uptime of the bot.",
    group: "META",
    usage: "uptime",
  },
  check: Permissions.all,
  async exec(message: Message, args: string[]) {
    if (!client.uptime || !client.user) return;

    let seconds = client.uptime / 1000;
    let d = Math.floor(seconds / 86400);
    let h = Math.floor(seconds / 3600);
    seconds %= 3600;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    return message.channel.send(
      `**${client.user.tag} UPTIME**\n_${d}_ DAYS, _${h}_ HOURS, _${m}_ MINUTES, _${s.toFixed(3)}_ SECONDS`
    );
  },
});
