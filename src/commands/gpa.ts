import Command, {Permissions} from "../lib/command";
import {askString, choose, questionValidate} from "../lib/prompt";
import {GuildMember, PartialGuildMember, Message, DMChannel} from "discord.js";

export default Command({
    names: ["gpa"],
    documentation:{
        description: "A simple semester GPA calculator.",
        group: "GENERAL",
        usage: "gpa",
    },
    check: Permissions.all,
    async exec(message: Message, args: string[]){
        const dm = await message.author.createDM();

        let numClasses = await askString("How many classes are you taking?", dm);
        while(!parseInt(numClasses, 10)){
            numClasses = await askString("I'm sorry, I can't quite understand what you're saying.", dm);
        }

        var i;
        let totalHours: number, totalPoints: number;
        for(i=1; i <= numClasses; i++){
            let hours = await askString(
                `How many credit hours for class ${i}?`, dm
            );
            while(!parseInt(hours, 10)){
                hours = await askString(
                    `I'm sorry, I can't quite understand what you're saying. How many hours for class ${i}?`,
                     dm
                );
            }

            let grade = await choose(
                `What was your letter grade in class ${i}? _(e.g. A, B, C, D, F)_`,
                dm,
                [
                    ["A"], ["B"], ["C"], ["D"], ["F"]
                ]
            );

            let points;
            switch(grade){
                case "A":
                    points = 4;
                    break;
                case "B":
                    points = 3;
                    break;
                case "C":
                    points = 2;
                    break;
                case "D":
                    points = 1;
                    break;
                case "F":
                    points = 0;
                    break;
            }

            let qualityPoints = parseInt(hours, 10) * points;
            totalPoints += qualityPoints;
            totalHours += parseInt(hours, 10);
        }

        let gpa: number  = totalPoints / totalHours;

        return dm.send(`Alright, your semester GPA is ${gpa}`);
    },
})