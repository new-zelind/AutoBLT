import Command, {Permissions} from "../lib/command";
import {getLastCommit, Commit} from "git-last-commit";
import {Message} from "discord.js";
import {code} from "../lib/util";

const getCommit = () =>
    new Promise<Commit>((res, rej) => {
        getLastCommit((err, commit) => (err ? rej(err) : res(commit)));
    });

export default Command({
    names:["version"],
    documentation:{
        description: "View the commit version of AutoBLT",
        group: "DEV",
        usage: "version"
    },

    check: Permissions.owner,
    async exec(message: Message){
        const lastCommit = await getCommit();

        let msg = `HASH    | ${lastCommit.hash}\n`;
        msg +=    `BRANCH  | ${lastCommit.branch}\n`;
        msg +=    `SUBJECT | ${lastCommit.subject}\n`;
        msg +=    `AUTHOR  | ${lastCommit.author.name}`;
        return message.channel.send(code(msg));
    },
});