const { Events,EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			interaction.reply({content: "Invalid command"})
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const errorEmbed = new EmbedBuilder()
			.setTitle("There was an error executing this command")
			.setColor('Random')
			.setFooter({text: `Executed by ${interaction.user.username}`})
			.setTimestamp()

		try {
			await command.execute(interaction);
		} catch (error) {
			interaction.reply({embeds: [errorEmbed]})
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
