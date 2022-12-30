const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const Meme = require("memer-api");
const { memeAPI } = require('../config.json')
const memer = new Meme(memeAPI)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('tweet')
        .setDescription('Turn text into a tweet')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text you want to appear in a tweet')
                .setRequired(true)),
    async execute(interaction){
        const text = interaction.options.getString('text')
        const avatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        const username = interaction.user.username
        

        interaction.reply({content: `Working on it`})
        await memer.tweet(avatar,username,text).then(image => {
            const attachment = new AttachmentBuilder(image, 'twitter.png')
            interaction.editReply({content: `Average Twitter user :skull:`, files: [attachment]})
        })
    }
}