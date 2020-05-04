export default {
  name: "ping",
  description: "Heartbeat of bot",

  execute(msg, args) {
    let start = Date.now();
    msg.reply("pong!");
    msg.channel.send(`_Took ${Date.now() - start} ms._`);
  },
};
