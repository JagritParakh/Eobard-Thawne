const { SlashCommandBuilder,AttachmentBuilder,EmbedBuilder } = require('discord.js')
const canvacord = require('canvacord')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a user')
        .addUserOption(option =>
            option  
                .setName('target')
                .setDescription('The user you want to slap')
                .setRequired(true)),
    async execute(interaction){
        const targetedUser = interaction.options.getUser('target')

        const userAvatar = interaction.user.displayAvatarURL()
        const targetedUserAvatar = targetedUser.displayAvatarURL()

        const img = await canvacord.Canvas.slap(userAvatar,targetedUserAvatar)

        const attachment = new AttachmentBuilder(img, 'slap.png')

        interaction.reply({files: [attachment]})
    }
}