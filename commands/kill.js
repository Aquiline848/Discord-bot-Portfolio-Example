const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Mata a un tipo')
    .addUserOption(option => option.setName('user') .setRequired(true) .setDescription('menciona a tu peor enemigo muajajaja')),
  async execute(interaction) {
    const user = interaction.options.getUser('user')
    if(interaction.user.tag === user.tag) {
      interaction.reply('🩸 suicidarse esta mal');

    } else {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('🩸 La Matanza')
        .setDescription(`**${interaction.user.tag}** mato hoy al señor **${user.tag}**, **🪦RIP ${user.tag}**`)
      interaction.deferReply();
      interaction.deleteReply();
      interaction.channel.send({embeds: [embed]});
    }

  },
};