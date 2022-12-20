const { SlashCommandBuilder,EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Gives a cute cat image'),
    async execute(interaction){
        const url = "https://cataas.com/cat"
        const embed = new EmbedBuilder()
            .setTitle("Cat.")
            .setImage(url)
            .setFooter({text:`Neko dayo.`})
            .setTimestamp()

        interaction.reply({embeds: [embed]})
    }
}