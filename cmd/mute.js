const { SlashCommandBuilder,EmbedBuilder,PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user you want to mute')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason you are muting the user')
                .setRequired(false)),
    async execute(interaction){
        const member = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason') ?? 'unkown.. provide a reason next time dumbo'
        const mutedRole = interaction.guild.roles.cache.find(role => (role.name).toLowerCase() === 'muted')

        const success = new EmbedBuilder()
        .setTitle(`Muted user\nReason: ${reason}`)
        .setColor('Random')
        .setFooter({text:`Executed by ${interaction.user.username}`})
        .setTimestamp()

        const noRole = new EmbedBuilder()
             .setTitle("The muted role doesnt exist")
             .setColor('Random')
             .setFooter({text:`Executed by ${interaction.user.username}`})
             .setTimestamp()
        
        const alreadyMuted = new EmbedBuilder()
             .setTitle("User is already muted")
             .setColor('Random')
             .setFooter({text:`Executed by ${interaction.user.username}`})
             .setTimestamp()

        const fail = new EmbedBuilder()
             .setTitle("There was an error")
             .setColor('Random')
             .setFooter({text:`Executed by ${interaction.user.username}`})
             .setTimestamp()

        if(!mutedRole){
            interaction.reply({embeds: [noRole]})
            return;
        }
        console.log(member.roles.cache.has(mutedRole.id));
        if(member.roles.cache.has(mutedRole.id)){
            interaction.reply({embeds: [alreadyMuted]})
            return;
        }

        member.roles
            .add(mutedRole.id)
            .then((m) => interaction.reply({embeds: [success]}))
            .catch((e) => interaction.reply({embeds: [fail]}), console.error())


    }
}