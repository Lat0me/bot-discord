const Discord = require('discord.js');
const client = new Discord.Client();
const Command = require('./command/command.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.guild) return;

    Command.Ping(message);
    Command.moderation(message);
    Command.role(message);

});


client.login('NTAyNzc5MjYxNDg5NTEyNDQ4.Dqs68A.WethyzkdwOTRZLJBlvw6WNtiVa0');
