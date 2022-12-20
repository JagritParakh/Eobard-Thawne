const { SlashCommandBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { tenorId } = require('../config.json')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Get a random GIF or enter a category')
		.addStringOption(option =>
            option.setName('category')
              .setDescription('Category of GIF')
              .setRequired(false)),
	async execute(interaction) {
		let url = "foo"
		const input = interaction.options.getString('category') ?? 'None provided'
		if(input === 'None Provided'){
			url = `https://tenor.googleapis.com/v2/featured?tenorId=${tenorId}&client_key=my_test_app&limit=8`
		}else{
			const validUrl = input.split(' ').join('%20')
			url = `https://tenor.googleapis.com/v2/search?q=${validUrl}&tenorId=${tenorId}&client_key=my_test_app&limit=8`
		}
		
		const res = await fetch(url)
		let json = await res.json()
		// console.log(json);
		let index = Math.floor(Math.random() * json.results.length)
		const gif = json.results[index].url
		// console.log(gif);
		await interaction.reply(gif);
	},
};

