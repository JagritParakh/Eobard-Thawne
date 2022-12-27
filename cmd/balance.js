const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const balance = require('../schemas/balanceSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Returns balance of a user')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user whose balance will be returned')
                .setRequired(false)),
    async execute(interaction){
        const user = interaction.options.getUser('target') ?? interaction.user
        const storedBalance = await balance.findOne({userId: user.id})
        
        const noBalance = new EmbedBuilder()
            .setColor('Random')
            .setTimestamp()
            .setTitle(`${user.tag} doesnt have a balance\n`)
            .setFooter({text: `Executed by ${interaction.user.username}`})
        if(!storedBalance){
            interaction.reply({embeds: [noBalance]})
            return
        }
        const userBalance = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setTitle(`Balance: ${storedBalance.bal} monies \nChat to earn more monies`)
        .setAuthor({name: user.tag, iconURL: user.displayAvatarURL()})
        .setFooter({text: `Executed by ${interaction.user.username}`})
        interaction.reply({embeds: [userBalance]})
    }
    }