const { SlashCommandBuilder, Embed, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Mira los comandos'),
  async execute( interaction) {
     const stpage = new EmbedBuilder()
       .setColor("Random")
       .setTitle("Helping you with los pros bot")
       .setAuthor({ name: 'LosPros Bot'})
       .setImage(interaction.client.displayAvatarURL)
       .addFields(
         { name: 'Look this', value: 'Hello, my name is Mario and i am the developer of this bot here you will have all the information of commands, greetings Mario'}
       )
    const ndpage = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Comandos para hacerse el gracioso 🤣")
      .addFields(
        {name: "`kill`", value: '**Haz la matanza de uvalde pero en vez de un colegio en discord y en vez de a 22 personas a 1**'},
        {name: "`gay`", value: 'ponele a tu amigo gay una bandera gay encima de su avatar 🏳️‍🌈'},
        {name: "`howgay`", value: 'para saber quien es gay de tus amigos 🏳️‍🌈'}

      )
    const rdpage = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Moderation commands  only for moderators")
      .addFields(
        {name: "`clear`", value: "**Para borrar mensajes sin necesidad de ir uno a uno**"},
    {name: "`kick`", value: "Kickea personas"},
        {name: "`ban`", value:"Banea personas malas"}
      )
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('home')
          .setLabel('inicio 🏘️')
          .setStyle(1),
        new ButtonBuilder()
          .setCustomId('fun')
          .setLabel('fun 🤣 ')
          .setStyle(3),
        new ButtonBuilder()
          .setCustomId('mod')
          .setLabel(`Moderation`)
          .setStyle(2)


      );
     const filter = i => i.customId;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 1500000 });
    await interaction.reply({embeds: [stpage], components: [row]})
    collector.on('collect', async i => {

      if(i.customId === "home") {
        i.update({embeds: [stpage], components: [row]})

      } else if (i.customId === "fun") {

        i.update({embeds: [ndpage], components: [row]})
      } else  if (i.customId === "mod") {
        i.update({embeds: [rdpage], components: [row]})
      }
    })
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));


  },
};