const { SlashCommandBuilder, EmbedBuilder,} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask a question and get a random answer')
        .addStringOption(option =>
            option.setName('question')
              .setDescription('The question')
              .setRequired(true)),
	async execute(interaction) {
        const question = interaction.options.getString('question')
        const answers = ["idfc.", "i honestly could care less", "this has as importance to me as my maths marks", "touch grass", "no bruh..", "gae", "idk.. ask infi", "shanti se gaana sunne do fr :pray:", "how will this affect lebrons legacy?","cope", "yes bruh", "hm yes the floor is made out of floor","i mean there are higher chances of ishayu getting a girlfriend","i did not ask.","this video is sponsored by raid shadow legends", "bing chilling", "YES MY GUY", "NO MY G", "what would andrew tatte do?", "https://bit.do/yeetyeet", "there are lesser chances of arka being rejected", "go ahead..", "deal with ur own shit ffs"]
        const index = Math.floor(Math.random() * answers.length)

        const embed = new EmbedBuilder()
             .setColor('Random')
             .setTitle(`Question: ${question}`)
             .setFields({name: `Your question:`, value: question}, {name: `The :sparkles: :8ball: 8-Ball :8ball: :sparkles: says:`, value: answers[index]})
             .setFooter({text: `Question asked by ${interaction.user.username}`})
		await interaction.reply({embeds: [embed]});
	},
};


