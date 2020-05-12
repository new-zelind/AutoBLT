import {Client, DiscordAPIError, Message} from "discord.js";
import {authorization} from "../lib/access";
//import {Debug} from "../commands/debug";
const owner = authorization("discord.owner");

/**
 * A function to report errors to the owner.
 * @param client: An instance of the client.
 * @return A DM message of the error.
 */
export default function report(client: Client){
    return async(error: Error) => {
        let me = await client.users.fetch("286283133337206784");
        return me.send(`${process.env["DEV"] ? "DEV MODE" : "PRODUCTION"}: ${error.stack}`);
    };
}

/**
 * A function to send a message directly to the owner.
 * @param client: An instance of the client.
 * @return A DM message of the information reported by the bot.
 */
export function information(client: Client){
    return async(content: any) => {
        let me = await client.users.fetch("286283133337206784");
        return me.send(content);
    };
}