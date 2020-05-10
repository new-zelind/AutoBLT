import {addOneTimeMessageHandler} from "./message";
import {DMChannel, Message} from "discord.js";

//ask question and wait for response from user
function ask(question: string, channel: DMChannel) {
  channel.send(question);
  return new Promise<Message>(resolve => {
    addOneTimeMessageHandler(message => {
      if (channel.id !== message.channel.id) return false;
      resolve(message);
      return true;
    });
  });
}

//simple way to ask a string to a user
export function askString(question: string, channel: DMChannel) {
  return ask(question, channel).then(message => message.content);
}

//validator definition
type ValidatorFunction = (
  message: string
) => Promise<boolean | string> | string | boolean;

//simple method to automatically validate inputs from the user
function questionValidate(
  question: string,
  channel: DMChannel,
  validate: ValidatorFunction,
  failureMessage: string
): Promise<string> {
  return askString(question, channel).then(async response => {
    let corrected = await validate(response);
    // If the validator explicity returns true, then return the original resposne
    if (corrected === true) {
      return response;
    }
    // Else if the validator returns a string which coerces to true, the return the corrected string
    if (corrected) {
      return corrected;
    }
    // Else, the validator failed. Print the failureMessage, and start again
    channel.send(failureMessage);
    return questionValidate(question, channel, validate, failureMessage);
  });
}

//for when the user must select different options
function choose(question: string, channel: DMChannel, options: string[][]) {
  return questionValidate(
    question,
    channel,
    response => {
      let index = options.findIndex(opt =>
        opt.includes(response.toUpperCase())
      );
      if (index < 0) return false;
      return options[index][0];
    },
    "I can\'t quite understand what you said. Try again, please."
  );
}

export { ask, askString as question, questionValidate, choose };