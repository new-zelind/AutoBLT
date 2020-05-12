import delve from "dlv";

/**
 * Delves through the authorization.json file.
 * @param access: The member to search for in the authorization file.
 * @return: The item that #access was meant to find.
 */
export function authorization(access: string | string[]){
    const file = require("../../authorization.json");
    return delve(file, access);
}

/**
 * Delves through the config.json file.
 * @param access The member to search for in the config file.
 * @return: The item that #access was meant to find.
 */
export function config(access: string | string[]){
    const file = require("../../config.json");
    return delve(file, access);
}