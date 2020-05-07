import Command, { Permissions, makeEmbed } from "../libraries/command";
import { Message, TextChannel } from "discord.js";;
import { client } from "../client";
import { information } from "../libraries/report";
import execa from "execa";
import * as keya from "keya";
import { addOneTimeMessageHandler, removeMessageHandler } from "../libraries/message";
import { code, escape, inline } from "../libraries/util";
import { getLastCommit, Commit } from "git-last-commit";

const getCommit = () =>
  new Promise<Commit>((res, rej) => {
    getLastCommit((err, commit) => (err ? rej(err) : res(commit)));
  });

export let DEBUG = false;

export class DebugCommand extends Command("debug") {
  check = Permissions.compose(Permissions.guild, Permissions.owner);

  documentation = {
    description: "Toggles debug mode. Owner Only Command",
    usage: "debug",
    group: "Owner",
  };

  exec(message: Message, args: string[]) {
    DEBUG = !DEBUG;
    message.channel.send(`Debug ${DEBUG ? "ENABLED" : "DISABLED"}`);
  }
}

new DebugCommand();

export class StoreCommand extends Command("store") {
  check = Permissions.compose(Permissions.guild, Permissions.owner);

  documentation = {
    description: "Manages keya stores",
    usage: "cache <store name> [list|clear|get|delete] <key>",
    group: "Owner",
  };

  async exec(message: Message, args: string[]) {
    const store = await keya.store(args[1]);

    switch (args[0]) {
      case "clear":
        await store.clear();
        return message.channel.send(`Cleared ${inline(store.name)}`);
      case "list":
        const all = await store.all().then((a) => a.map((v) => v.key));

        const embed = makeEmbed(message)
          .setTitle(store.name)
          .setDescription(
            `${all.length} items;\n${all.slice(0, 24).join("\n")}${
              all.length > 25 ? "\n*...*" : ""
            }`
          );

        return message.channel.send({ embed });

      case "get":
        const value = await store.get(args[2]);
        if (!value) {
          return message.channel.send(
            `Can't find key ${inline(args[2])} in store ${inline(store.name)}`
          );
        }
        return message.channel.send(code(JSON.stringify(value)));

      case "delete":
        const deleted = await store.delete(args[2]);
        return message.channel.send(
          deleted
            ? "Deleted successfully"
            : "Did not delete! Probably because that key did not exist"
        );
    }
  }
}

new StoreCommand();

export class PingCommand extends Command("ping") {
  check = Permissions.all;

  documentation = {
    description: "Heartbeat",
    usage: `ping`,
    group: "Meta",
  };

  async exec(message: Message, args: string[]) {
    const user = message.member;

    return message.channel.send("pong");
  }
}

new PingCommand();

export class ExecCommand extends Command("shell") {
  check = Permissions.compose(Permissions.owner);

  prompt = "";

  constructor() {
    super();

    // Get shell prompt
    this.prompt = `vexbot@${
      process.env["DEV"] ? "development" : "production"
    } $ `;
  }

  documentation = {
    description: "Arbitrary Shell execution",
    usage: `shell echo "Hi"`,
    group: "Owner",
  };

  async exec(message: Message, params: string[]) {
    let body = `${this.prompt}${params.join(" ")}\n`;
    let resp = (await message.channel.send(code(body))) as Message;

    let response;
    let handler;
    try {
      const process = execa.command(params.join(" "));

      async function handleChunk(chunk: Buffer) {
        // If the chunk itself is too big, handle it in sections
        if (chunk.length > 1900) {
          for (let i = 0; i < chunk.length; i += 1900) {
            const subchunk = chunk.slice(i, i + 1900);
            await handleChunk(subchunk);
          }
        }

        // If length would be exceed
        if (body.length + chunk.length > 1900) {
          body = escape(chunk.toString());
          resp = (await message.channel.send(code(body))) as Message;
        } else {
          body += escape(chunk.toString());
          await resp.edit(code(body));
        }
      }

      process.stdout.on("data", handleChunk);
      process.stderr.on("data", handleChunk);

      // Cancel process
      handler = addOneTimeMessageHandler((m) => {
        if (
          m.channel.id !== message.channel.id ||
          m.member.id !== message.member.id ||
          m.content !== "exit"
        ) {
          return false;
        }

        process.kill();
        process.stdout.off("data", handleChunk);
        process.stderr.off("data", handleChunk);
        message.channel.send("Killed");
        return true;
      });

      response = await process;
      removeMessageHandler(handler);
    } catch (error) {
      response = error;
    }

    return resp.edit(
      `${code(body)}EXITED ${
        response.failed ? "UNSUCCESSFULLY" : "SUCCESSFULLY"
      } (${response.exitCode} ${response.exitCodeName})\n`
    );
  }

  async fail(message: Message) {
    const report = information(client);
    await report(`Failed attempt at shell execution by ${message.author}`);
  }
}

const exec = new ExecCommand();
export { exec };

export class RestartCommand extends Command("restart") {
  check = Permissions.compose(Permissions.owner, Permissions.guild);

  async exec(message: Message) {
    execa.command("pm2 restart AutoBLT");
    return message.channel.send("Restarting...");
  }

  documentation = {
    group: "OWNER",
    description: "Restarts AutoBLT",
    usage: "restart",
  };
}

new RestartCommand();


export class MessagesCommand extends Command("messages") {
  check = Permissions.owner;

  documentation = {
    group: "OWNER",
    description: "Gets messages channels in a specified channel",
    usage: "messages <id>",
  };

  async exec(message: Message, args: string[]) {
    const channel = client.channels.get(args[0]);
    if (!channel) {
      return message.channel.send("Can't access that channel!");
    }

    if (channel.type == "category" || channel.type == "voice") {
      return message.channel.send("Not a text channel");
    }

    // Get channels
    const messages = await (channel as TextChannel).fetchMessages({
      limit: 50,
    });
    for (let [, m] of messages) {
      message.channel.send(
        `${m.member.user.username}#${m.member.user.discriminator} in ${
          m.type === "dm" ? "DM" : m.channel.toString()
        }: ${m.cleanContent}`,
        {
          files: m.attachments.map((attach) => attach.url),
        }
      );
    }
  }
}

new MessagesCommand();

export class VersionCommand extends Command("version") {
  check = Permissions.owner;

  documentation = {
    description: "Gets AutoBLT version",
    usage: `version`,
    group: "Owner",
  };

  async exec(message: Message, args: string[]) {
    const commit = await getCommit();
    return message.channel.send(
      `\`\`\`\ncommit ${commit.hash}\n${commit.sanitizedSubject}\n\`\`\``
    );
  }
}

new VersionCommand();