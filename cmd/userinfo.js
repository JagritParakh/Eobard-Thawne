const { SlashCommandBuilder,EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get the info of a user!')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user whos info you want')
                .setRequired(true)),
    async execute(interaction){
        const member = interaction.options.getMember('target')
        const roles = member.roles.cache.filter(role => role.id !== member.guild.id).toJSON().join(',')
        const joinedAt = new Date(member.joinedAt).toUTCString()
        const createdAt = new Date(interaction.options.getUser('target').createdAt).toUTCString()
        
        const embed = new EmbedBuilder()
            // .setTitle(member.user.username)
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()
            .setColor('Random')
            .setAuthor({name: member.user.username})
            .setThumbnail(member.displayAvatarURL())
            .addFields({
              name: 'Member:', value: `<@${member.id}>`, inline: false
            },
            {
              name: 'Roles', value: roles, inline: true
            },
            {
              name: 'Joined at:', value: joinedAt, inline: true
            },
            {
              name: 'Created at', value: createdAt, inline:true
            },
            {
              name: 'ID', value: member.id, inline: true
            },
            {
              name: 'Status', value: member.presence?.status, inline: true
            },
            {
              name: 'Activity', value: member.presence.activites ? `${member.presence.activites[0].name}`:'No activity', inline: true
            }
            )
        interaction.reply({embeds: [embed]})
    }
}
