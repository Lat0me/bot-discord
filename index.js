require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const Command = require('./command/command.js');
const Press = require('./command/press.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    let newsChannel = client.channels.get('682524486888718407');
    Press.fluxRss(newsChannel).then(r => console.log(r))
});

client.on('message', message => {
    if (!message.guild) return;
    Command.moderation(message);
    Command.Ping(message)
});

client.login(process.env.API_KEY);
