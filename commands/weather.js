const { SlashCommandBuilder } = require('discord.js');
var weather = require('weather-js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Mira si va a llover')
    .addStringOption(option => option.setName("ciudad") .setDescription("Pon la ciudad de la que quieres mirar el tiempo") .setRequired(true)),
  async execute(interaction) {
    const city = interaction.options.getString("ciudad")
    weather.find({search: `${city}`, degreeType: 'C'}, function (err, result) {
      if(err) console.log(err)
      const resultado = JSON.stringify(result, null, 2)

      console.log(resultado)

    })
  },
};