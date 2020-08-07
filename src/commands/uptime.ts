import Command, { Permissions } from "../lib/command";
import { Message } from "discord.js";
import { client } from "../client";

export default Command({
  names: ["uptime"],

  documentation: {
    description: "Check the uptime of the bot.",
    group: "META",
    usage: "uptime",
  },

  check: Permissions.any(
    Permissions.channel("bot-commands"),
    Permissions.owner
  ),

  async fail(message:Message){
    return message.channel.send(`In _#bot-commands_, please!`);
  },

  async exec(message: Message){
    if (!client.uptime || !client.user) return;

    /*let seconds = client.uptime / 1000;
    let d = Math.floor(seconds / 86400);
    let h = Math.floor(seconds / 3600);
    seconds %= 3600;
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;*/

    let s = client.uptime / 1000;
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    s %= 60;
    m %= 60;
    h %= 24;

    return message.channel.send(
      `**${client.user.tag} UPTIME**\n_${d}_ DAYS, _${h}_ HOURS, _${m}_ MINUTES, _${s.toFixed(3)}_ SECONDS`
    );
  },
});
