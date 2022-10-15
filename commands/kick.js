const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Echa a los usuarios con estilos')
    .addStringOption(option => option.setName('razon') .setRequired(true).setDescription("di por que lo vas a banear") .setMaxLength(300))
    .addUserOption(option => option.setName('user') .setRequired(true) .setDescription("user")),
  async execute(interaction) {
    let target = interaction.options.getUser('user')
    let user =  await interaction.guild.members.fetch(target.id).catch(console.error);
    let reason = interaction.options.getString('razon');
    const checkEmbed = new EmbedBuilder()
      .setTitle(`¿Estas seguro de kickear  a ${target.tag} por ${reason}?`)
      .setDescription("Presiona el boton de Si para aceptar y No para denegar")
      .setColor("Green")
    const success = new EmbedBuilder()
      .setTitle(`**He kickeado satisfactioramente a ${target.tag}**`)
      .setColor("Green")
      .setDescription(`He kickeado a quien tu ya sabes por ${reason}.`)
    const failed = new EmbedBuilder()
      .setTitle(`**No lo he kickeado**`)
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
        await user.send(`You have been kicked from ${interaction.guild.name} \n${reason}`)
          .catch(console.error)
      } else  if (i.customId === "no") {
        i.update({embeds: [failed], components: []})
      }
    })

  },
};