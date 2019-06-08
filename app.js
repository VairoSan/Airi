const { Client, Collection } = require('discord.js');
const winston = require('winston');
const { token } = require('./config.json');

const client = new Client({ disableEveryone: true });



client.once('ready', () => {
  client.commands = new Collection();
  winston.log('info', `connected as ${client.user.tag}`);
});



client.login(token);
