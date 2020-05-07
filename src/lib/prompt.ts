import {addOneTimeMessageHandler} from "./message";
import {DMChannel, Message} from "discord.js";
import { promises } from "dns";

/*function ask(question: string, channel: DMChannel){
    channel.send(question);
    return new Promise<Message>(resolve => {
        addOneTimeMessageHandler(message => {
            if(channel.id !== message.channel.id) return false;
            resolve(message);
            return true;
        });
    });
}

export function askString(question: string, channel: DMChannel){
    return ask(question, channel).then(message => message.content);
}

type ValidatorFunction = (
    message: string 
) => Promise<boolean | string> | boolean | string;

function questionValidate(
    question: string,
    channel: DMChannel,
    validate: ValidatorFunction,
    failureMessage: string 
): Promise<string> {
    return askString(question, channel).then(async response => {
        let corrected = await validate(response);
        
        if(corrected === true) return response;
        else if(corrected) return corrected;
        else channel.send(failureMessage);

        return questionValidate(question, channel, validate, failureMessage);
    });
}

function choose(question: string, channel: DMChannel, options: string[][]){
    return questionValidate(
        question,
        channel,
        response => {
            let index = options.findIndex(opt =>
                opt.includes(response.toUpperCase())
            );
            if(index < 0) return false;
            return options[index][0];
        },
        "Hmm, I can't quite understand what you're saying."
    );
}

export{ask, askString as question, questionValidate, choose};*/

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

export function askString(question: string, channel: DMChannel) {
  return ask(question, channel).then(message => message.content);
}

type ValidatorFunction = (
  message: string
) => Promise<boolean | string> | string | boolean;
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
    "I'm not sure I understand what you mean"
  );
}

export { ask, askString as question, questionValidate, choose };