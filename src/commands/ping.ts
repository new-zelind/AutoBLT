module.exports = {
    name:'ping',
    description:'heartbeat of the bot',
    execute(msg, args){
        let start = Date.now();
        msg.reply('pong!');
        msg.channel.send(`_Took ${Date.now()-start} ms._`);
    },
};