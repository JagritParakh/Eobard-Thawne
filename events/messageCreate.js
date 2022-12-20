const { Events } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message){
        if(message.content === "ping"){
            message.channel.send("pong")
        }
    }
}