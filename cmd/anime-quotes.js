const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const Meme = require("memer-api");
const { memeAPI } = require('../config.json')
const memer = new Meme(memeAPI)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('animequotes')
        .setDescription('Return a random anime quote'),
    async execute(interaction){
        const waitingEmbed = new EmbedBuilder()
            .setTitle('Getting quote')
            .setColor('Random')
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()

        await interaction.reply({embeds: [waitingEmbed]})
        const resp = await memer.animequotes()
        const quote = resp.quote
        const name = resp.name
        const anime = resp.anime
        

        const embed = new EmbedBuilder()
            .setTitle(`Anime: ${anime}`)
            .addFields({name: `By: ${name}`, value: quote, inline:false})
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setColor('Random')
        
        await interaction.editReply({embeds: [embed]})
    }
}