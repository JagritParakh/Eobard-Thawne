const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member to ban')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction){
        const target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') ?? 'No reason given'

        let banMSG = "for being joe"
        if(reason === 'No reason given') banMSG = `Banning ${target.username}. No reason was given`
        else banMSG = `Banning ${target.username} for ${reason}`
        const embed = new EmbedBuilder()
             .setColor('Random')
             .setTitle(banMSG)
             .setFooter({text:`By: ${interaction.user.username}`})
        await interaction.reply({
            embeds: [embed]
        })
        await interaction.guild.members.ban(target);

    }
};
