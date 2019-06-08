const { Client, Collection } = require('discord.js');
const winston = require('winston');
const commands = require('./commands/');
const { token, prefix } = require('./config.json');

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
  logger.info(`connected as ${client.user.tag}`);
});

client.on('message', msg => {
  // ignore bots and messages that not start with the prefix
  if (msg.author.bot || !msg.content.startsWith(prefix)) return undefined;
  
  // handling commands
  const args = msg.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const commandsKeys = Object.keys(commands);

  try {
    if (commandsKeys.includes(commandName)) commands[commandName](msg, args);
    else msg.reply('Invalid command!');

  } catch (ex) {
    msg.reply('Unexpected error happened while running this command.');
    logger.error(ex);
  }

});



client.login(token);
