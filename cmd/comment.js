const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js')
const Meme = require("memer-api");
const { memeAPI } = require('../config.json')
const memer = new Meme(memeAPI)
module.exports = {
    data: new SlashCommandBuilder()
        .setName('comment')
        .setDescription('Turn text into a youtube comment')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text you want to appear in a yt comment')
                .setRequired(true)),
    async execute(interaction){
        const text = interaction.options.getString('text')
        const avatar = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        const username = interaction.user.username

        interaction.reply({content: `Working on it`})

        memer.youtube(avatar,username,text).then(image => {
            const attachment = new AttachmentBuilder(image, 'youtube.png')
            interaction.editReply({content: '\u200B',files: [attachment]})
        })
    }
}