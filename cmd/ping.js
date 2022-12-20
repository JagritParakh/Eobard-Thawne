const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong'),
	async execute(interaction) {
	
		const uneditedEmbed = new EmbedBuilder()
			.setTitle('Pinging...')
			.setColor('Random')
			.setTimestamp()
		const sent = await interaction.reply({embeds: [uneditedEmbed], fetchReply: true})

		let totalSeconds = interaction.client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let roundedSeconds = Math.round(seconds);
		let uptime = `${days} day(s), ${hours} hour(s), ${minutes} minutes and ${roundedSeconds} seconds`

		const editedEmbed = new EmbedBuilder()
		.setTitle('Pong!')
		.addFields({name: `API Latency: ${Math.round(interaction.client.ws.ping)}ms \nUptime: ${uptime}\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`, value: `\u200B`})
		.setColor('Random')
		.setTimestamp()
		.setFooter({text: `Executed by ${interaction.user.username}`})

		await interaction.editReply({embeds: [editedEmbed]})
	},
};
