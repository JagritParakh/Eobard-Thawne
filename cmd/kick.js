const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member to kick')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to kick')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for kicking'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
    async execute(interaction){
        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') ?? 'No reason given'

        let kickMSG = "being joe"
        if(reason === 'No reason given') kickMSG = `Kicking ${target.username}. No reason was given`
        else kickMSG = `Kicking ${target.username} for ${reason}`
        const embed = new EmbedBuilder()
             .setColor('Random')
             .setTitle(kickMSG)
             .setFooter({text:`By: ${interaction.user.username}`})
        await interaction.reply({
            embeds: [embed]
        })
        await interaction.guild.members.kick(target)
    }
};
