const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("Generate a NSFW image"),
  async execute(interaction){
    const e = new EmbedBuilder()
    .setTitle('Getting image')
    .setColor('Random')
    .setFooter({text: `Executed by ${interaction.user.username}`})
    await interaction.reply({embeds: [e]})
    let img = await hmtai.nsfw.hentai()
    const embed = new EmbedBuilder()
        .setTitle('i agree.')
        .setColor('Random')
        .setFooter({text: `Executed by ${interaction.user.username}`})
        .setImage(img)
    interaction.reply({embeds: [embed]})
  }
}