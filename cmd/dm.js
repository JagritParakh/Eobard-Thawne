const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Send a DM to a user')
        .addUserOption(option =>
            option  
                .setName('target')
                .setDescription('The user you want to dm')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The message you want to send')
                .setRequired(true))
        .setDMPermission(true),
    async execute(interaction){
        const user = interaction.options.getUser('target')
        const message = interaction.options.getString('text')
        await interaction.reply({content: `Sending message`, ephemeral:true})
        user.send(message)
            .then(async () => {
                await interaction.editReply({content: `DM sent successfully`, ephemeral: true})
            })
            .catch(async () => {
                await interaction.editReply({content: 'Could not send the DM', ephemeral:true})
            })
    }
}