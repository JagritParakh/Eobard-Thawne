const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { verifyRole } = require('../config.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify a user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user you want to verify')
                .setRequired(true)),
    async execute(interaction){
        const member = interaction.options.getMember('target')
        const role = interaction.guild.roles.cache.find(r => r.id === verifyRole)
        const roleID = role.id

        const verified = new EmbedBuilder()
             .setTitle(`Verified`)
             .setColor(`Random`)
             .setFooter({text: `Executed by ${interaction.user.username}`})
             .setTimestamp()

        
        const alreadyVerified = new EmbedBuilder()
             .setTitle(`User is already verified`)
             .setColor('Random')
             .setFooter({text: `Executed by ${interaction.user.username}`})
             .setTimestamp()
        
        const errorEmbed = new EmbedBuilder()
             .setTitle(`There was an error`)
             .setColor('Random')
             .setFooter({text: `Executed by ${interaction.user.username}`})
             .setTimestamp()

        console.log(member.roles.cache.has(roleID));
        if(member.roles.cache.has(roleID)){
            interaction.reply({embeds: [alreadyVerified]})
            return;
        }

        member.roles
            .add(role)
            .then((m) => interaction.reply({embeds: [verified]}))
            .catch((e) => interaction.reply({embeds: [errorEmbed]}),console.error())
    }
}