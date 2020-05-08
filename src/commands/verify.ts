import verify from "../behaviors/verify";
import Command, {Permissions} from "../lib/command";
import { GuildMember, Message} from "discord.js";

export default Command({
    names: ["verify"],
    
    documentation: {
        description: 'Manually starts verification for a member',
        group: "OWNER",
        usage: "verify <@user>",
    },

    check: Permissions.owner,
    exec(message){
        message.mentions.members.forEach((member : GuildMember) => {
            console.log(`Started manual verification for ${member}`);
            verify(member);
        });
    },
});