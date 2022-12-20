const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get the description of the server'),
    async execute(interaction){
        const guild = interaction.guild
        const count = guild.memberCount
        const id = guild.id
        const name = guild.name
        const createdAt = new Date(guild.createdAt).toUTCString()
        const owner = userMention(guild.ownerId)
        await guild.fetch()
        const online = guild.approximatePresenceCount + 1;
        const icon = guild.iconURL()
        const textChannels = guild.channels.cache.filter(c => c.type == 0).size
        const voiceChannels = guild.channels.cache.filter(c => c.type == 2).size
        const categories = guild.channels.cache.filter(c => c.type == 4).size
        const threads = guild.channels.cache.filter(c => c.type == 11).size
        const embed = new EmbedBuilder()
            .setTitle("Server info")
            .setAuthor({name: name})
            .setThumbnail(icon)
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()
            .setColor('Random')
            .addFields({
                name: 'ID:', value: `${id}`,inline:false
            },
            {
                name: 'Owner:', value: owner,inline:false
            },
            {
                name: 'Created at:', value: `${createdAt}`,inline:false
            },
            {
                name: 'Member Count:', value: `${count}`,inline:false
            },
            {
                name: 'Currently online:', value: `${online}`,inline:false
            },
            {
                name: 'Total Channels:', value: `${textChannels + voiceChannels}`,inline:false
            },
            {
                name: 'Text Channels:', value: `${textChannels}`,inline:false
            },
            {
                name: 'Voice Channels:', value: `${voiceChannels}`,inline:false
            },
            {
                name: 'Categories:', value: `${categories}`,inline:false
            },
            {
                name: 'Threads:', value: `${threads}`,inline:false
            }
            )
        interaction.reply({embeds: [embed]})
    }
}