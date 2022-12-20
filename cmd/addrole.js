const { SlashCommandBuilder,PermissionFlagsBits, EmbedBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giverole')
        .setDescription('Give a role to a user')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('User to give the role')
                .setRequired(true))
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The role you want to give')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDMPermission(false),
    async execute(interaction){

        const member = interaction.options.getMember('target')
        const role = interaction.options.getRole('role')

        const roleGiven = new EmbedBuilder()
        .setTitle(`Role given to user`)
        .setColor(`Random`)
        .setFooter({text: `Executed by ${interaction.user.username}`})
        .setTimestamp()

   
   const alreadyHas = new EmbedBuilder()
        .setTitle(`User already has the role`)
        .setColor('Random')
        .setFooter({text: `Executed by ${interaction.user.username}`})
        .setTimestamp()
   
   const errorEmbed = new EmbedBuilder()
        .setTitle(`There was an error`)
        .setColor('Random')
        .setFooter({text: `Executed by ${interaction.user.username}`})
        .setTimestamp()

    const noRole = new EmbedBuilder()
         .setTitle("Specified role doesnt exist. Please check again")
         .setColor('Random')
         .setFooter({text: `Executed by ${interaction.user.username}`})
        .setTimestamp()

        if(!role) {
            interaction.reply({embeds: [noRole]})
        }

        console.log(member.roles.cache.has(role));
        if(member.roles.cache.has(role)){
            interaction.reply({embeds: [alreadyHas]})
            return;
        }

        member.roles
            .add(role)
            .then((m) => interaction.reply({embeds: [roleGiven]}))
            .catch((e) => interaction.reply({embeds: [errorEmbed]}), console.error)
    }
}