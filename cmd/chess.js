const { SlashCommandBuilder,EmbedBuilder } = require('discord.js')
const ChessWebAPI = require('chess-web-api')
const chessAPI = new ChessWebAPI()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chess')
        .setDescription('Search up a player on chess.com')
        .addStringOption(option =>
            option
                .setName('username')
                .setDescription('The username you want to search on chess.com')
                .setRequired(true)),
    async execute(interaction){

        const userSearch = interaction.options.getString('username')
        let userExists = true;
        const response = await chessAPI
            .getPlayer(userSearch)
            .catch(e => userExists = false)

        if(!userExists){
            const userDoesntExist = new EmbedBuilder()
                .setTitle('Player doesnt exist')
                .setColor('Random')
                .setTimestamp()
                .setFooter({text: `Executed by ${interaction.user.username}`})
            console.log('User doesnt exist');
            await interaction.reply({embeds: [userDoesntExist]})
            return;
        }

        const waitingEmbed = new EmbedBuilder()
            .setTitle('Getting Player info')
            .setColor('Random')
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})
        await interaction.reply({embeds: [waitingEmbed]})

        const data = response.body
        
        const url = data.url
        const username = url.split('https://www.chess.com/member/')[1]

        console.log(username);

        const name = data.name??'Not provided by user'
        const followers = data.followers
        const avatar = data.avatar
        const country = data.country.split('https://api.chess.com/pub/country/')[1]

        const resp = await chessAPI.getPlayerStats(userSearch)
        const stats = resp.body
        console.log(stats);

        const dailyRating = stats.chess_daily.last.rating
        const dailyWins = stats.chess_daily.record.win
        const dailyLosses = stats.chess_daily.record.loss
        const dailyDraws = stats.chess_daily.record.draw

        const bulletRating = stats.chess_bullet.last.rating
        const bulletWins = stats.chess_bullet.record.win
        const bulletLosses = stats.chess_bullet.record.loss
        const bulletDraws = stats.chess_bullet.record.draw

        const blitzRating = stats.chess_blitz.last.rating
        const blitzWins = stats.chess_blitz.record.win
        const blitzLosses = stats.chess_blitz.record.loss
        const blitzDraws = stats.chess_blitz.record.draw

        const rapidRating = stats.chess_rapid.last.rating
        const rapidWins = stats.chess_rapid.record.win
        const rapidLosses = stats.chess_rapid.record.loss
        const rapidDraws = stats.chess_rapid.record.draw

        const embed = new EmbedBuilder()
            .setAuthor({name: username, iconURL:avatar, url: url})
            .setColor('Random')
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .addFields({
                name: `Name:`, value: name, inline: true
            }, {
                name: `Followers:`, value: `${followers}`, inline:true
            }, {
                name: `Country:`, value: country, inline: true
            }, {
                name: `Bullet Stats:`, value: `Rating: **${bulletRating}**\nWins: **${bulletWins}**\nLosses: **${bulletLosses}**\nDraws: **${bulletDraws}**`, inline: false
            },{
                name: `Blitz Stats:`, value: `Rating: **${blitzRating}**\nWins: **${blitzWins}**\nLosses: **${blitzLosses}**\nDraws: **${blitzDraws}**`, inline: false
            },{
                name: `Rapid Stats:`, value: `Rating: **${rapidRating}**\nWins: **${rapidWins}**\nLosses: **${rapidLosses}**\nDraws: **${rapidDraws}**`, inline: false
            }, {
                name: `Daily Stats:`, value: `Rating: **${dailyRating}**\nWins: **${dailyWins}**\nLosses: **${dailyLosses}**\nDraws: **${dailyDraws}**`, inline: false
            })

        await interaction.editReply({embeds: [embed]})
    }
}
/* REF
chessAPI.getPlayer('andyruwruw')
    .then(function(response) {
        console.log('Player Profile', response.body);
    }, function(err) {
        console.error(err);
    });
*/