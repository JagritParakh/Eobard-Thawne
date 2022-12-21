const { SlashCommandBuilder,EmbedBuilder } = require('discord.js')
const snipe = require('../schemas/snipeSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Snipe a deleted message'),
    async execute(interaction){
        let data = await snipe.findOne({ channelId: interaction.channel.id})

        const noSnipes = new EmbedBuilder()
            .setTitle('There are no messages to be sniped')
            .setColor('Random')
            .setFooter({text:`Executed by ${interaction.user.username}`})
            .setTimestamp()

        if(!data){
            return await interaction.reply({embeds: [noSnipes]})
        }

        const snipeEmbed = new EmbedBuilder()
            .setAuthor({name: data.author, iconURL: data.avatar})
            .setFields(
                {
                    name: 'Message:', value: data.message, inline:true
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

        await interaction.reply({embeds: [snipeEmbed]})
    }
}