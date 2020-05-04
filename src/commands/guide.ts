module.exports = {
    name:'guide',
    description:'Returns a PDF of The Guide for RAs.',
    execute(msg, args){
        msg.channel.send({ files: [{
            attachment: './src/extern/theGuide.pdf',
            name: 'theGuide.pdf'
        }]}).catch(console.error);
    }
    
}