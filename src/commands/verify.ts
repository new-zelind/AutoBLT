import verify from "../behaviors/verify";
import { GuildMember, Message} from "discord.js";

export default{
    name: 'verify',
    description: 'Manually starts verification for a member',
    execute(msg : Message, args){
        msg.mentions.members.forEach((member : GuildMember) => {
            console.log(`Started manual verification for ${member}`);
            verify(member);
        })
    }
}