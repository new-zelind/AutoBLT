import {addOneTimeMessageHandler} from "./message";
import {DMChannel, Message} from "discord.js";

/**
 * Ask a question to the user.
 * @param question: The question to ask the user
 * @param channel: The user's DM.
 */
export function ask(question: string, channel: DMChannel) {
  channel.send(question);
  return new Promise<Message>(resolve => {
    addOneTimeMessageHandler(message => {
      //if (channel.id !== message.channel.id) return false;
      resolve(message);
      return true;
    });
  });
}

/**
 * A function to call ask() in order to return the response string
 * @param question: The question to ask the user
 * @param channel: The channel to ask the user in
 */
export function askString(question: string, channel: DMChannel) {
  return ask(question, channel).then(message => message.content);
}

//validator definition
//returns true if valid input; false if not.
type ValidatorFunction = (
  message: string
) => Promise<boolean | string> | string | boolean;

/**
 * A way to automatically validate the user's input.
 * @param question: The question asked
 * @param channel: The user's DM
 * @param validate: The ValidatorFunction defined above
 * @param failureMessage: Message to send the user in case of an invalid input.
 */
export function questionValidate(
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

/**
 * For when the user must select between predefined answer choices. 
 * @param question: The question to ask the user.
 * @param channel: The user's DMs.
 * @param options: A string of strings that contains the options the user must select from.
 */
export function choose(question: string, channel: DMChannel, options: string[][]) {
  
  //call the validation function on the user's answer.
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