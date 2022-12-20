const { SlashCommandBuilder,EmbedBuilder,PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a muted user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user you want to unmute')
                .setRequired(true)),
    async execute(interaction){
        const member = interaction.options.getMember('target')
        const role = interaction.guild.roles.cache.find(r => (r.name).toLowerCase() === "muted")

        const success = new EmbedBuilder()
            .setTitle("Unmuted user")
            .setColor('Random')
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()
        
        const fail = new EmbedBuilder()
            .setTitle("There was an error")
            .setColor('Random')
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()

        const noRole = new EmbedBuilder()
                .setTitle("The muted role doesnt exist")
                .setColor('Random')
                .setFooter({text: `Executed by ${interaction.user.username}`})
                .setTimestamp()

        const notMuted = new EmbedBuilder()
            .setTitle("User is not muted")
            .setColor('Random')
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()

        if(!role){
            interaction.reply({embeds: [noRole]})
            return;
        }
        console.log(member.roles.cache.has(role.id));
        if(!member.roles.cache.has(role.id)){
            interaction.reply({embeds: [notMuted]})
            return;
        }

        member.roles
            .remove(role)
            .then((m) => interaction.reply({embeds: [success]}))
            .catch((e) => interaction.reply({embeds: [fail]}), console.error())
    }
}