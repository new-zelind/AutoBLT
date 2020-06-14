import { Message } from "discord.js";

//type definition
type MessageHandler = (message: Message) => Promise<boolean> | boolean;

//use a simple array stack implementation for the message handlers.
const handlers: MessageHandler[] = [];

/**
 * A simple function to add a messageHandler object to the stack
 * @pre : #handlers != null
 * @param handler : the messageHandler to be added
 * @post : handlers.size++;
 */
function addMessageHandler(handler: MessageHandler) {
  return handlers.push(handler) - 1;
}
/**
 * A function to remove a messageHandler object from the stack
 * @pre handlers[#index] != null
 * @param index : the index of the handler to remove
 * @post : handlers[#index] = false
 */
//Pops a message handler from the stack, replacing it with an empty function.
function removeMessageHandler(index: number) {
  handlers[index] = () => false;
}

/**
 * A function to add a single-use messageHandler object to the stack
 * @pre handlers.size != 0 && handlers != null
 * @param handler the one-time messageHandler to add
 * @returns index iff #handler resolves
 *          the resolution function of #handler if it does not resolve
 */
function addOneTimeMessageHandler(handler: MessageHandler) {
  let index = addMessageHandler(async function (message: Message) {
    let res = await handler(message);
    if (res) removeMessageHandler(index);
    return res;
  });
  return index;
}

/**
 * Handles the messages sent and interpreted by the bot
 * @pre handlers.indexOf(#message) != -1
 * @param message : The message sent in the server
 * @return the command or function called to resolve #message
 */
async function handleMessage(message: Message) {
  let i = 0;
  while (!(await handlers[i++](message)) && i < handlers.length) {}
  return handlers[i];
}

//create Command handler type
type CommandHandler = (
  args: string[],
  message: Message
) => Promise<boolean> | boolean;

export {
  addMessageHandler,
  removeMessageHandler,
  addOneTimeMessageHandler,
  handleMessage,
};
