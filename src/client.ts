const Discord = require ("discord.js");

const token = 
    process.env.DISCORD_TOKEN || require("../authorization").discord.token;
const client = new Discord.Client();

client.login(token);
export{client};