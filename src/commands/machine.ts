import { Message } from "discord.js";
import Command, { Permissions } from "../lib/command";

import * as os from "os";

export const MachineCommand = Command({
  names: ["machine"],
  documentation: {
    usage: "machine",
    description: "Lists the machine AutoBLT is running on",
    group: "ADMIN",
  },

  check: Permissions.owner,

  async fail(message:Message){
    return message.channel.send(`Hey, you're not Zach...`);
  },

  exec(message: Message) {
    const { username } = os.userInfo();
    const machine = os.hostname();

    const type = os.type();
    const arch = os.arch();

    return message.channel.send(
      `Running on \`${username}@${machine} (${type} ${arch})\``
    );
  },
});
