import {Client} from "discord.js";
import {authorization} from "../lib/access";
import {code} from "../lib/util";

const owner = authorization("discord.owner");

function report(client: Client){
    return async(error: Error) => {
        let me = await client.users.fetch(owner);
        return me.send(`${code(error.stack)}`);
    };
}

function information(client: Client){
    return async(content: any) => {
        let me = await client.users.fetch(owner);
        return me.send(content);
    };
}

export {
    report,
    information
};