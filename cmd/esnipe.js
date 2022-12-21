const { SlashCommandBuilder,EmbedBuilder } = require('discord.js')
const esnipe = require('../schemas/esnipeSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('esnipe')
        .setDescription('Snipe an edited message'),
    async execute(interaction){
        let data = await esnipe.findOne({ channelId: interaction.channel.id})

        const noSnipes = new EmbedBuilder()
            .setTitle('There are no messages to be sniped')
            .setColor('Random')
            .setFooter({text:`Executed by ${interaction.user.username}`})
            .setTimestamp()

        if(!data){
            return await interaction.reply({embeds: [noSnipes]})
        }

        const esnipeEmbed = new EmbedBuilder()
            .setAuthor({name: data.author, iconURL: data.avatar})
            .setFields(
                {
                    name: 'Old Message:', value: data.oldMessage, inline:true
                },
                {
                    name: 'Edited Messaged: ', value: data.newMessage, inline: true 
                },
                {
                    name: "Sent in: ", value: `<#${data.channelId}>`
                },
                {
                    name: 'Time: ', value: `<t:${data.time}:R>`, inline:true
                }
            )
            .setColor('Random')
            .setFooter({text:`Executed by ${interaction.user.username}`})
            .setTimestamp()

        await interaction.reply({embeds: [esnipeEmbed]})
    }
}