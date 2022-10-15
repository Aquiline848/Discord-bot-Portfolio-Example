const { SlashCommandBuilder, Embed, EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('howgay')
    .setDescription('Pues te dice si sos gay o no')
    .addUserOption(option => option.setName('user') .setDescription('user') .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user')
    const gayProbability = Math.floor(Math.random() * 100) + 1;
    const embed = new EmbedBuilder()
      .setTitle("Seras gay? 🏳️‍🌈")
      .setColor('Random')
      .setDescription(`${user.tag} es  ${gayProbability}%🏳️‍🌈`)
    interaction.reply({embeds: [embed]})
  },
};