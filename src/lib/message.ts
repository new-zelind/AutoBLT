import { Message } from "discord.js";

//type definition
type MessageHandler = (message: Message) => Promise<boolean> | boolean;

//use a simple array stack implementation for the message handlers.
const handlers: MessageHandler[] = [];

/**
 * Adds a message handler onto the stack.
 * @param handler: The MessageHandler object to be added.
 */
function addMessageHandler(handler: MessageHandler){
    return handlers.push(handler) -1;
}

/**
 * Remove a message handler from the stack and replace it with an empty function.
 * @param index The index of the handler to be removed.
 */
function removeMessageHandler(index: number){
    handlers[index] = () => false;
}

/**
 * Adds a single-use handler to the message handler stack.
 * @param handler: The handler to be added, used, then removed.
 */
function addOneTimeMessageHandler(handler: MessageHandler){
    let index = addMessageHandler(async function(message: Message) {
        let res = await handler(message);
        if(res) removeMessageHandler(index);
        return res;
    });
    return index;
}

/**
 * A function to handle each message passed into the bot.
 * @param message: A message from the user.
 */
async function handleMessage(message: Message){
    let i=0;
    while(!(await handlers[i++](message)) && i < handlers.length) {
        console.log(`Cycling handler `, handlers[i]);
    }
    return handlers[i];
}

//create Command handler type
type CommandHandler = (
    args: string[],
    message: Message
) => Promise<boolean> | boolean;

export{addMessageHandler, removeMessageHandler, addOneTimeMessageHandler, handleMessage};
