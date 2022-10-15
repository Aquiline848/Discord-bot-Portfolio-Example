require('dotenv').config();
const  { Client, GatewayIntentBits, Collection} = require('discord.js');
const token = process.env.TOKEN;
const client = new Client({ intents: GatewayIntentBits.Guilds });
const path = require('path')
const fs = require('fs')
const {connect, connection} = require("mongoose");
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//DB
connect("mongodb+srv://mario:mario@disbot.socjhmi.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true})
  console.log("Conected to db")


let db  = connection;

//END OF DB
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    });
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(token);