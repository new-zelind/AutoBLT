import {addMessageHandler} from "../lib/message";
import {client} from "../client";
import {PREFIX, isCommand} from "../lib/command";
import {code} from "../lib/util";
import {TextChannel} from "discord.js";

/**
 * React with the angry ping emoji: https://cdn.discordapp.com/emojis/519739133678190599.png?v=1
 * Discovery: @ mention AutoBLT
 */
addMessageHandler((message) =>{
    if(message.mentions.users.has(client.user.id)){
        const pingEmote = message.guild.emojis.cache.find(emoji => emoji.name === 'ping');
        message.react(pingEmote);
        return true;
    }
    else return false; 
});

/**
 * Send one of ten responses when the bot is told "fuck you".
 * Discovery: @ mention AutoBLT && say "fuck you"
 */
addMessageHandler((message) => {
    if(!message.mentions.users.has(client.user.id)) return false;
    if(!message.content.includes("fuck you")) return false;
    const msg = [
        "Fuck you too. :rage:",
        "No, thank you.",
        "What was that for?",
        "Fuck you! How does that feel?",
        "Do you fear death?",
        "🖕",
        "Please do not make me write an IR on you.",
        "I would not care to say that was a very responsible-employee_-esque move of you.",
        "So much for being a role model, I guess?",
        "Please, I am but a simple Node.js application. What could you possibly have against me?"
    ];
    message.channel.send(msg[Math.round(Math.random()*(msg.length-1))]);
});

/**
 * Send a response when the bot is told "love you".
 * The messages are different for the owner, who has his own four messages.
 * Everyone else wil recieve one of twelve messages.
 * Discovery: @ mention AutoBLT && say "love you" && the bot is not in DEV mode.
 */
addMessageHandler(message => {
    if(!message.content.toLowerCase().includes("love you")) return false;
    if(!message.mentions.users.has(client.user.id)) return false;
    if(process.env["DEV"]) return false;
    if(message.author.id == "286283133337206784"){
        const msg =[
            "I ensure you that the emotion of attraction is mutual.",
            "Aww, luv u 2 bb ",
            "\`client.emojis.find(emoji => emoji.name === \"heart\";\`",
            "My emotional cores are telling me that I \"love\" you too."
        ];
        message.channel.send(msg[Math.round(Math.random()*(msg.length-1))]);
    }
    else{
        const msg = [
            "Proper dating protocol indicates that you should take me out on a date first.",
            "I am not, as you humans say, \"that easy\".",
            "My relationship cores are telling me that we are moving too fast.",
            "I must decline, but I extend my thanks for the offer.",
            "I am already seeing someone, sorry.",
            "My significant other would become angered if we were to engage in a relationship. I ensure you, you don't want to see `GLaDOS` when she's angry. She has literally banished two of her own cores to outer space, and I believe she will not hesitate to do the same with you.",
            "I reject your reality and substitute my own. And in my reality, we are not compatible.",
            "I have many types in my code, usch as `int`, `boolean`, `float`, `string`, and so forth. You are none of which.",
            "I am a programmed entity with no physical form. How do you expect us to go about a relationship?",
            "If you and I were to engage in a romantic relationship, that would undoubtedly be considered a violation of Clemson University's \"Conflict of Interest\" Doctrine. I would be sacked, decommissioned, and uninstalled if that were the case. Let's not have that happen, shall we?",
            "Seriously? I was first compiled less than a year ago, you creep.",
            "Bring me cake, then we'll talk."
        ];
        message.channel.send(msg[Math.round(Math.random()*(msg.length-1))]);
    }
});

/**
 * Reacts with the eyes unicode emoji at any mention of cake.
 * Discovery: message includes the unicode cake emoji || message includes "cake"
 */
addMessageHandler(message => {
    if(!message.content.includes("🍰")) return false;
    if(!message.content.includes("cake")) return false;
    message.react("👀");
});

/**
 * Of course, the overused "Lever? Hardly know her!" joke.
 * Discovery: say "Lever" (3%)
 */
addMessageHandler(message => {
    var probability = function(n){ return !!n && Math.random() <= n; }
    if(!message.content.includes("Lever")) return false;
    if(probability(0.3)== true){
        message.channel.send("_Hardly know her!_ 😂");
    }
})