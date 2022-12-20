const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("sfw")
    .setDescription("Generate a SFW image"),
  async execute(interaction){
    const e = new EmbedBuilder()
        .setTitle('Getting image')
        .setColor('Random')
        .setFooter({text: `Executed by ${interaction.user.username}`})
    await interaction.reply({embeds: [e]})
    let img = await hmtai.sfw.neko_arts()
    const embed = new EmbedBuilder()
        .setTitle('sfw? aight ig..')
        .setColor('Random')
        .setFooter({text: `Executed by ${interaction.user.username}`})
        .setImage(img)
    await interaction.editReply({embeds: [embed]})
  }
}