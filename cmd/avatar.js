const { SlashCommandBuilder,EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a users avatar')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('User whos avatar you want')
                .setRequired(true)),
    async execute(interaction){
        const user = interaction.options.getUser('target')
        const embed =  new EmbedBuilder()
            .setColor('Random')
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL())


        interaction.reply({embeds: [embed]})
    }
}