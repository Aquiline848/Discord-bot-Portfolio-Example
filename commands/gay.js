const { SlashCommandBuilder, AttachmentBuilder, Attachment} = require('discord.js');
const DIG = require('discord-image-generation')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gay')
    .setDescription('Genera una imagen de la persona que selecciones pero con la bandera gay')
    .addUserOption(option => option.setName("user") .setRequired(true) .setDescription('user')),
  async execute(interaction) {
    const user =  interaction.options.getUser('user')
    let avatar = user.displayAvatarURL({extension: "png"});
    let img = await new DIG.Gay().getImage(avatar)
    let attach = new AttachmentBuilder(img, {name: 'gay-image.png'})
    interaction.deferReply();
    interaction.deleteReply();
     interaction.channel.send({files: [attach]})
  },
};