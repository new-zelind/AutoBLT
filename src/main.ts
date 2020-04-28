import discord, { Client } from "discord.js";

const client = new Client();
client.login(process.env.token);

client.on("ready", () => {
  console.log("AutoBLT is online and ready");
});
