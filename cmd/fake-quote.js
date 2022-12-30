const { SlashCommandBuilder,AttachmentBuilder,EmbedBuilder } = require('discord.js')
const canvacord = require('canvacord')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fakequote')
        .setDescription('Turn text into a quote!')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text you want to turn into a quote')
                .setRequired(true)),
    async execute(interaction){
        const msg = interaction.options.getString('text')
        const avatar = interaction.user.displayAvatarURL()
        const username = interaction.user.username

        const img = await canvacord.Canvas.quote({image:avatar,message:msg,username:username})
        const attachment = new AttachmentBuilder(img, 'quote.png')
        interaction.reply({files: [attachment]})
    }
}