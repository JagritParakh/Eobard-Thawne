const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const googleIt = require('google-it')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('google')
        .setDescription('Google anything you want')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The thing you want to google')
                .setRequired(true)),
    async execute(interaction){
        const query = interaction.options.getString('text')

        const embed = new EmbedBuilder()
            .setTitle('Search results:')
            .setColor('Random')
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})

        googleIt({query: query})
            .then(results => {
            results.forEach(function(item,index){
                embed.addFields({
                    name: `${index+1}:`, value: `${item.title} ${item.link}`, inline: true
                })
            });
            interaction.reply({embeds: [embed]})
        })
            .catch((e) => console.error)
    }
}