const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a los que se porten mal')
    .addUserOption(option => option.setName('user') .setDescription('user') .setRequired(true))
    .addStringOption(option => option.setName("reason") .setDescription("razon del baneo").setRequired(true)),


  async execute(interaction) {
    let target = interaction.options.getUser('user')
    let user =  await interaction.guild.members.fetch(target.id).catch(console.error);
    let reason = interaction.options.getString('reason');
    const checkEmbed = new EmbedBuilder()
      .setTitle(`¿Estas seguro de bamear  a ${target.tag} por ${reason}?`)
      .setDescription("Presiona el boton de Si para aceptar y No para denegar")
      .setColor("Green")
    const success = new EmbedBuilder()
      .setTitle(`**He baneado satisfactioramente a ${target.tag}**`)
      .setColor("Green")
      .setDescription(`He baneado a quien tu ya sabes por ${reason}.`)
    const failed = new EmbedBuilder()
      .setTitle(`**No lo he baneado**`)
      .setColor("Red")
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('yes')
          .setLabel('Si')
          .setStyle(3),
        new ButtonBuilder()
          .setCustomId('no')
          .setLabel('No')
          .setStyle(4)
      )
    interaction.deferReply();
    interaction.deleteReply();
    const filter = i => i.customId;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });
    interaction.channel.send({embeds: [checkEmbed], components: [row]})
    collector.on('collect', async i => {
      if(i.customId === "yes") {
        i.update({embeds: [success], components: []})
        await user.kick(reason);
        await user.send(`You have been banned from ${interaction.guild.name} \n${reason}`)
          .catch(console.error)
      } else  if (i.customId === "no") {
        i.update({embeds: [failed], components: []})
      }
    })

  },
};