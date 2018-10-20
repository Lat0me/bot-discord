exports.Ping = function(message)  {
    if (message.content === '!ping') {
        message.reply(
            '```Markdown\n' +
            'Pong\n' +
            '====' +
            '```'
        );
    }
    if (message.content === '!pong') {
        message.reply(
            '```Markdown\n' +
            'Ping\n' +
            '====' +
            '```'
        );
    }
};

exports.moderation = function(message) {
    // If the message content starts with "!kick"
    if (message.content.startsWith('!kick')) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                /**
                 * Kick the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 */
                member.kick('Optional reason that will display in the audit logs').then(() => {
                    // We let the message author know we were able to kick the person
                    message.reply(`Successfully kicked ${user.tag}`);
                }).catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to kick the member,
                    // either due to missing permissions or role hierarchy
                    message.reply('I was unable to kick the member');
                    // Log the error
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply('That user isn\'t in this guild!');
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply('You didn\'t mention the user to kick!');
        }
    }
};

exports.role = function (message) {

    let server = message.guild;
    let memberServer = message.member;

    if (message.content.startsWith('!role')) {
        let userTest = message.author;
        message.author.createDM().then(channel => {
            channel.send("Salut @" + userTest.username + ", je te propose un petit test pour obtenir ton rôle :). \n" +
                "Fait `!go` pour commencer. \n" +
                "Merci de répondre sérieusement.");

            channel.client.on(
                'message', message => {
                    if (message.content.startsWith('!go')) {
                        channel.send("`1ere Question :` \n" +
                            "Front ? \n" +
                            "Oui - > `!o`\n" +
                            "Non - > `!n`");
                        channel.client.on(
                            'message', message => {
                                if (message.content.startsWith('!o')) {
                                    memberServer.addRole(server.roles.get("501027461870387210"));
                                    channel.send("Tu as le rôle 💢Front");
                                    return message.author.deleteDM();
                                } else if (message.content.startsWith('!n')) {
                                    channel.send("Suivants");
                                }
                            }
                        )
                    }
                    return message.author.deleteDM();
                }
            )
        });
    }
};


