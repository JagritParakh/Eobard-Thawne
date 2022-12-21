const { Events } = require('discord.js')

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage){
        // console.log(newMessage.content)

        const esnipe = require("../schemas/esnipeSchema")
        let data = await esnipe.findOne({channelId: newMessage.channel.id})
        const date = Date.now()
        if(!data){
            let newdata = new esnipe({
                channelId: newMessage.channel.id,
                oldMessage: oldMessage.content,
                newMessage: newMessage.content,
                author: newMessage.author.tag,
                avatar: newMessage.author.displayAvatarURL(),
                time: Math.floor(date/1000)
            })
            return await newdata.save()
        }
    
        await esnipe.findOneAndUpdate({
            channelId: newMessage.channel.id,
            oldMessage: oldMessage.content,
            newMessage: newMessage.content,
            author: newMessage.author.tag,
            avatar: newMessage.author.displayAvatarURL(),
            time: Math.floor(date/1000)
        })
    }
}