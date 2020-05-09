import Command, {
    Permissions,
    REGISTRY,
    PREFIX,
    CommandConfiguration as cmd,
    CommandConfiguration
} from "../lib/command";
import {Message} from "discord.js";

export default Command({
    names: ["help"],
    documentation:{
        description: "See commands, formatting, and returns",
        group: "META",
        usage: "Well, you found this, didn't you?",
    },
    check: Permissions.all,

    async exec(message){

        const groups: {
            [group: string]: CommandConfiguration[];
        } = {};

        for(const [name, command] of REGISTRY){
            if(name !== command.names[0]) continue;

            const allowed = await command.check(message);
            if(!allowed) continue;

            const group = command.documentation.group;

            if(groups[group]) groups[group].push(command);
            else groups[group] = [command];
        }

        let msg = "Here's my commands:";
        for(const [name, commands] of Object.entries(groups)){

            msg += `\n\n**${name}:\n`;
            for(const command of commands){
                msg += command.names.map((i) => `__${i}:__`);
                msg += ` ${command.documentation.description}\n`;
                msg += `       \`SYNTAX: ${PREFIX[0]}${command.documentation.usage}\'\n`;
            }
        }

        msg += "\nRemember to keep all bot useage in _#bot-commands_, please!";

        return message.reply(msg);
    }
});