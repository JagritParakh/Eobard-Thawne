const { SlashCommandBuilder,EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Get the info of  a role')
        .addRoleOption(option =>
                option
                    .setName('role')
                    .setDescription('The role whose info you want')
                    .setRequired(true)),
    async execute(interaction){
        const role = interaction.options.getRole('role')
        const name = role.name
        const id = role.id
        const color = role.color
        const perms = new PermissionsBitField(role.permissions.bitfield).toArray()
        const mentionable = role.mentionable
        console.log(perms);

        const embed = new EmbedBuilder()
            .setTitle(name)
            .setColor(color)
            .addFields({
                name: 'Role ID:', value: id, inline: true
            },
            {
                name: 'Mentionable:', value: mentionable ? 'Yes' : 'No', inline:true
            },
            {
                name: 'Role Permissions:', value: perms.join('\n')
            }
            )
            .setFooter({text: `Executed by ${interaction.user.username}`})
            .setTimestamp()
        
        interaction.reply({embeds: [embed]})
    }
}