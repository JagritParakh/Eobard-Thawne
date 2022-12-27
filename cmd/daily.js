const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const balance = require('../schemas/balanceSchema')
const { Types } = require('mongoose');

async function fetchBalance(user){
    let storedBalance = await balance.findOne({
        userId: user
    })
    if(!storedBalance){
        storedBalance = await new balance({
            _id: Types.ObjectId(),
            userId: user
        });
        await storedBalance
            .save()
            .catch(console.error)
        return storedBalance
    }else return storedBalance
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Start your journey by giving yourself 400 monei'),
    async execute(interaction){
        const storedBalance = await fetchBalance(interaction.user.id)
        
        if(storedBalance.bal === 0){
            interaction.reply({content: `Please run /start first`, ephemeral: true})
            return;
        }
        
        let time = 86400000

        if(time - (Date.now() - storedBalance.daily) > 0){
            let timeLeft = time - (Date.now() - storedBalance.daily)
            const alreadyClaimed = new EmbedBuilder()
                .setTitle(`You have already claimed this. Try again after ${Math.floor(timeLeft/3600000)} hours`)
                .setColor('Random')
                .setTimestamp()
                .setFooter({text: `Executed by ${interaction.user.username}`})
            interaction.reply({embeds: [alreadyClaimed]})
            return;
        }

        const claimed = new EmbedBuilder()
            .setTitle(`Added 100 monies to your bank account`)
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setColor('Random')
            .setTimestamp()
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})

        storedBalance.bal += 100
        storedBalance.daily = Date.now()
        await storedBalance.save()
        interaction.reply({embeds: [claimed]})
    }
}