const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const yts = require('yt-search')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('youtube')
		.setDescription('Search any video on youtube!')
    .addStringOption(option =>
      option
        .setName('video')
        .setDescription('Name of the video')
        .setRequired(true)),
	async execute(interaction) {
        const e = new EmbedBuilder()
            .setTitle('Getting video')
            .setColor('Random')
            .setFooter({text: `Executed by ${interaction.user.username}`})
        await interaction.reply({embeds: [e]})
        // console.log(interaction.options);
        const vid = interaction.options.getString('video')
        const r = await yts(vid)
        const videos = r.videos.slice( 0, 3 )
        const recommended = videos[0]
        // console.log(recommended);
        const url = recommended.url
        const title = recommended.title
        const timeStamp = recommended.timestamp
        const thumbnail = recommended.thumbnail
        const author = recommended.author.name
        const authorUrl = recommended.author.url
        const ago = recommended.ago

        const embed = new EmbedBuilder()
	         .setColor('Random')
             .setTitle(title)
             .setURL(url)
             .setAuthor({name: author, url:authorUrl})
             .setThumbnail(thumbnail)
             .setTimestamp()
             .setFooter({
                text: `Duration: ${timeStamp}\t Uploaded ${ago}`
             })

		    await interaction.editReply({embeds: [embed]})
	},
};

/*

                                            JSON FORMAT FOR REFERENCE
{
  type: 'video',
  videoId: '_CL6n0FJZpk',
  url: 'https://youtube.com/watch?v=_CL6n0FJZpk',
  title: 'Dr. Dre - Still D.R.E. (Official Music Video) ft. Snoop Dogg',
  description: 'REMASTERED IN HD!! CELEBRATING ONE BILLION VIEWS!! Official Music Video for Still D.R.E. performed by Dr. Dre ft. Snoop ...',
  image: 'https://i.ytimg.com/vi/_CL6n0FJZpk/hq720.jpg',
  thumbnail: 'https://i.ytimg.com/vi/_CL6n0FJZpk/hq720.jpg',
  seconds: 291,
  timestamp: '4:51',
  duration: { toString: [Function: toString], seconds: 291, timestamp: '4:51' },
  ago: '11 years ago',
  views: 1192623243,
  author: {
    name: 'Dr. Dre',
    url: 'https://youtube.com/channel/UCmHhviensDlGQeU8Yo80zdg'
  }
}
*/