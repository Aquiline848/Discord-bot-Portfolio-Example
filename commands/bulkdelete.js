const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Borra mensajes de un canal')
    .addIntegerOption(option => option.setName("mensajes") .setDescription('mensajes que tengo que eliminar, es un numero no tiene miramientos') .setRequired(true)),
  execute: async function (interaction) {
    const n = interaction.options.getInteger('mensajes')
    await interaction.channel.bulkDelete(n)
      .then(m => interaction.reply(`he borrado **${n}** mensajes`)).catch(err => interaction.reply('err'))
    setTimeout(
      function (){
        console.log("Timeouting")
      },
    1000)
    interaction.channel.bulkDelete(1)

  },
};