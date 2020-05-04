import * as Discord from "discord.js";

const token =
  process.env.DISCORD_TOKEN || require("../authorization").discord.token;
const client: Discord.Client = new Discord.Client();

client.login(token);
export { client };
