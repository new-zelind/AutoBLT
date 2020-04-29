import {Client} from "discord.js";

const token = 
    process.env.DISCORD_TOKEN || require("../authorization").discord.token;
const client = new Client();

client.login(token);
export{client};