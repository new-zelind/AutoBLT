import Command, {Permissions} from "../lib/command";
import {makeEmbed} from "../lib/util";

export default Command({
    names: ["contact"],
    documentation: {
        description: "Important phone numbers and emails.",
        group: "GENERAL",
        usage: "contact",
    },
    check: Permissions.all,
    exec(message){
        const embed = makeEmbed(message)
            .setColor("#566127")
            .setTitle("Contact Information:")
            .setDescription(
                "Here's some important contact information:"
            )
            .addFields(
                {
                    name: "Taylor Hanley, CD",
                    value: "Phone: (864) 656-0420\nEmail: thanle@clemson.edu"
                },
                {
                    name: "Grad 1",
                    value: "Phone: (864) 656-XXXX\nEmail: XXXXXXX@clemson.edu"
                },
                {
                    name: "Grad 2",
                    value: "Phone: (864) 656-XXXX\nEmail: XXXXXXX@clemson.edu"
                },
                {
                    name: "Byrnes Hall:",
                    value: "Desk: (864) 656-2140\nOn-Call: (864) 986-1111"
                },
                {
                    name: "Lever Hall:",
                    value: "Desk: (864) 656-7325\nOn-Call: (864) 986-1113"
                },
                {
                    name: "East Side GCD On-Call",
                    value: "(864) 656-4640"
                },
                {
                    name: "Maintenance: (7:30 AM - Midnight)",
                    value: "(864) 656-5450"
                },
                {
                    name: "CUPD / EMS / Fire / CAPS On-Call",
                    value: "Phone: (864) 656-2222\nEmail: police@clemson.edu"
                },
                {
                    name: "Redfern Health Center",
                    value: "(864) 656-2233"
                },
                {
                    name: "CAPS (Daytime)",
                    value: "(864) 656-2451"
                },
                {
                    name: "CCIT",
                    value: "(864) 656-3494"
                }
            );
        return message.channel.send(embed);
    }
})