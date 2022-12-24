const { SlashCommandBuilder,EmbedBuilder } = require('discord.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Play a round of trivia'),
    async execute(interaction){

        const resp = await fetch('https://opentdb.com/api.php?amount=1&type=multiple')
        const data = await resp.json()
        const results = data.results[0]
        const question = results.question
        const answer = results.correct_answer
        const category = results.category
        const options = [
            results.incorrect_answers[0],
            results.incorrect_answers[1],
            results.incorrect_answers[2],
            answer
        ]

        options.sort(() => Math.random() - 0.5) //Shuffle the array

        const questionEmbed = new EmbedBuilder()
        .setTitle(question)
        .setColor('Random')
        .setTimestamp()
        .addFields({
                name: ':one:', value: options[0], inline: false
            },{
                name: ':two:', value: options[1],inline: false
            },{
                name: ':three:', value: options[2],inline: false
            },{
                name: ':four:', value: options[3],inline: false
            })
        .setFooter({text: `Executed by ${interaction.user.username}\t Data from opentdb.com`})
        
        const incorrectEmbed = new EmbedBuilder()
            .setTitle('Seems like no one was able to get it')
            .setColor('Random')
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})

        const correctEmbed = new EmbedBuilder()
            .setTitle('Correct answer!')
            .setColor('Random')
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})
        
        

        const filter = response => {
            var isCorrect = false
            console.log(typeof(response.content))
            switch(response.content){
                case "1": isCorrect = options[0] === answer; break;
                case "2": isCorrect = options[1] === answer; break;
                case "3": isCorrect = options[2] === answer; break;
                case "4": isCorrect = options[3] === answer; break;
                default: isCorrect = false; break;
            }
            return isCorrect
        };
        console.log(answer+ "\n");
        console.log(options);
        await interaction.reply({embeds: [questionEmbed], fetchReply: true})
            .then(() => {
                interaction.channel.awaitMessages({filter,max:1,time: 4500, errors: ['time']})
                    .then(collected =>{
                        interaction.followUp({embeds: [correctEmbed]});
                    })
                    .catch(collected => {
                        interaction.followUp({embeds: [incorrectEmbed]})
                    })
            })
        }
}