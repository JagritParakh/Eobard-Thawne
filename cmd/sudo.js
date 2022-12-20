const { SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sudo')
        .setDescription('Impersonate a user')
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('User whos avatar you want')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('What you want to say')
                .setRequired(true)),
    async execute(interaction){
        const channel = interaction.channel
        const user = interaction.options.getUser('target')
        const input = interaction.options.getString('input')

        const webhook = await channel.createWebhook({
            name: user.username,
            avatar: user.displayAvatarURL()
        })

        await webhook.send({
            content: input,
            username: user.username,
            avatarURL: user.displayAvatarURL()
        })
    }
}