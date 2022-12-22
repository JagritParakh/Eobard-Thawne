const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Random Meme'),
	async execute(interaction) {
	const resp = await fetch('https://www.reddit.com/r/memes/random/.json')
	const list = await resp.json()
	const meme = list[0].data.children[0].data
	console.log(meme);
	const title = meme.title
	const author = meme.author
	const img = meme.url
	const url = `https://reddit.com/${meme.permalink}`
	const comments = meme.num_comments
	const upvotes = meme.ups

	const embed = new EmbedBuilder()
		.setTitle(title)
		.setColor('Random')
		.setImage(img)
		.setURL(url)
		.setTimestamp()
		.setFooter({text: `Meme by: ${author} \t 💬 ${comments} \t ⬆️ ${upvotes}`})

	await interaction.reply({embeds: [embed]})
	
	},
};
