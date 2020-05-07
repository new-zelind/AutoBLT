import {Client, DiscordAPIError, Message} from "discord.js";
import {authorization} from "../lib/access";
//import {Debug} from "../commands/debug";
const owner = authorization("discord.owner");

export default function report(client: Client){
    return async(error: Error) => {
        let me = await client.users.fetch(owner);
        return me.send(`${process.env["DEV"] ? "DEV MODE" : "PRODUCTION"}: ${error.stack}`);
    };
}

export function information(client: Client){
    return async(content: any) => {
        let me = await client.users.fetch(owner);
        return me.send(content);
    };
}