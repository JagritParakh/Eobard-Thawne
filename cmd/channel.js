const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const youtube = require('./youtube');
const YouTube = require("youtube-sr").default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yt-channel')
		.setDescription('Searches for a channel on youtube')
        .addStringOption(option =>
            option.setName('channel')
              .setDescription('Channel name')
              .setRequired(true)),
	async execute(interaction) {
        const channelName = interaction.options.getString('channel')

        const res = await YouTube.searchOne(channelName)
        const channel = res.channel
        console.log(channel);

        const name = channel.name
        const url = channel.url
        const img = channel.icon.url

        const embed = new EmbedBuilder()
             .setColor('Random')
             .setTitle(name)
             .setURL(url)
             .setTimestamp()
             .setThumbnail(img)
             .setFooter({
                text: `Channel: ${name}`
             })
		await interaction.reply({embeds: [embed]});
	},
};

/*
JSON FORMAT
channel: Channel {
name: 'Indila',
verified: true,
id: 'UCX4EBb-NmxyntI0mQAErHvQ',
url: 'https://www.youtube.com/channel/UCX4EBb-NmxyntI0mQAErHvQ',
icon: [Object],
subscribers: null
},                W
*/