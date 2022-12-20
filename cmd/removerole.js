const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Remove a role from a user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The user you want to remove the role')
                .setRequired(true))
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The role you want to remove')
                .setRequired(true)),
    async execute(interaction){

        const member = interaction.options.getMember('target')
        const role = interaction.options.getRole('role')
        console.log(member + "\n" + role)

   const roleRemoved = new EmbedBuilder()
        .setTitle(`Role removed from user`)
        .setColor(`Random`)
        .setFooter({text: `Executed by ${interaction.user.username}`})
        .setTimestamp()

   
   const doesntHave = new EmbedBuilder()
        .setTitle(`User doesnt have the role`)
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

        if(!role){
            interaction.reply({embeds: [noRole]})
            return
        }
        console.log(!member.roles.cache.has(role.id))
         if(!member.roles.cache.has(role.id)){
            interaction.reply({embeds: [doesntHave]})
            return;
        }

        member.roles
            .remove(role)
            .then((m) => interaction.reply({embeds: [roleRemoved]}))
            .catch((e) => interaction.reply({embed: [errorEmbed]}), console.error())

    }
}