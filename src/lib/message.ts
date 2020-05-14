import { Message } from "discord.js";

//type definition
type MessageHandler = (message: Message) => Promise<boolean> | boolean;

//use a simple array stack implementation for the message handlers.
const handlers: MessageHandler[] = [];

//push a handler onto the stack.
function addMessageHandler(handler: MessageHandler) {
  return handlers.push(handler) - 1;
}

//Pops a message handler from the stack, replacing it with an empty function.
function removeMessageHandler(index: number) {
  handlers[index] = () => false;
}

//Add a single-use handler to the stack.
function addOneTimeMessageHandler(handler: MessageHandler) {
  let index = addMessageHandler(async function (message: Message) {
    let res = await handler(message);
    if (res) removeMessageHandler(index);
    return res;
  });
  return index;
}

//Handle the actual message
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
