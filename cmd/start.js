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
        .setName('start')
        .setDescription('Start your journey by giving yourself 400 monei'),
    async execute(interaction){
        const storedBalance = await fetchBalance(interaction.user.id)

        const alreadyStarted = new EmbedBuilder()
            .setTitle('You can only run this command once')
            .setColor('Random')
            .setTimestamp()
            .setFooter({text: `Executed by ${interaction.user.username}`})

        if(storedBalance.bal !== 0){
            interaction.reply({embeds: [alreadyStarted]})
            return;
        }

        const started = new EmbedBuilder()
            .setTitle(`Added 400 monies to ${interaction.user.tag}'s bank account. You are no longer a brokey!`)
            .setColor('Random')
            .setTimestamp()
            .setFooter({text:`Executed by ${interaction.user.username}`})

        await balance.findOneAndUpdate({_id: storedBalance._id}, {bal: storedBalance.bal + 400})
        interaction.reply({embeds: [started]})
    }   
}