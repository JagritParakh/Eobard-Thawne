const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with whatever you input')
        .addStringOption(option =>
            option.setName('input')
              .setDescription('The input to echo back')
              .setRequired(true)),
	async execute(interaction) {
        const echo = interaction.options.getString('input')
		await interaction.reply(echo);
	},
};

