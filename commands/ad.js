const { SlashCommandBuilder, AttachmentBuilder} = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cuadro')
    .setDescription('haz de tu perfil un cuadro')
    .addUserOption(option => option.setName('user') .setDescription('user') .setRequired(true)),
  async execute(interaction) {
    const user =  interaction.options.getUser('user')
    let avatar = user.displayAvatarURL({extension: "png"});
    let img = await new DIG.Ad().getImage(avatar)
    let attach = new AttachmentBuilder(img, {name: 'announce.png'})
    interaction.deferReply();
    interaction.deleteReply();
    interaction.channel.send({files: [attach]})
  },
};