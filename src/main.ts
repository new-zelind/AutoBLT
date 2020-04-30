import discord, { Client } from "discord.js";
import { STATUS_CODES } from "http";
import {client} from "./client";

//array of statuses for the bot
const statuses = [
  "over the server",
  "from afar",
  "the front desk",
  "Clemson Football",
  "ByrnesBot",
  "for errors",
  "TigerFlix",
  "sports highlights",
  "y'all",
  "training videos",
  "and waiting",
  "my residents"
];

const prefix = "*";

client.on("ready", () => {

  console.log("AutoBLT is online and ready");
  
  //automatically update status every minute
  //I suck at indexing, so here's a try/catch structure:
  try{
    setInterval(() => {
      const index = Math.floor(Math.random() * (statuses.length - 1));
      client.user.setActivity(statuses[index], {type: "WATCHING"});
    }, 60000);
  } catch {
    client.user.setActivity("with errors :/", {type: "PLAYING"});
  }

});
