const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat-text')
		.setDescription('Sends a cute cat picture with text')
        .addStringOption(option =>
            option.setName('text')
              .setDescription('The text to display')
              .setRequired(true)),
	async execute(interaction) {
        const input = interaction.options.getString('text')
        const validUrl = input.split(' ').join('%20')
        // console.log(validUrl);
        const url = `https://cataas.com/cat/says/${validUrl}`

        const embed = new EmbedBuilder()
             .setColor('Random')
             .setTitle(input)
             .setImage(url)
		await interaction.reply({embeds: [embed]});
	},
};

