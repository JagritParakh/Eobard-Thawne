const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot'),
    async execute(interaction){
        const devs = ["388949711165587458", "711534520280547330", "885006461002977280", "983323834587439116"]
        for(var i = 0; i<= devs.length -1; i++){
            if (interaction.user.id === devs[i]) return;
        }

        interaction.reply("https://discord.com/api/oauth2/authorize?client_id=1043825207556702229&permissions=8&scope=bot")
    }
}