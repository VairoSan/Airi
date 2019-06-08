const { Client, Collection } = require('discord.js');
const winston = require('winston');
const { token } = require('./config.json');

const client = new Client({ disableEveryone: true });
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ format: false})
  ]
});


client.once('ready', () => {
  client.commands = new Collection();
  logger.debug(`connected as ${client.user.tag}`);
});



client.login(token);
