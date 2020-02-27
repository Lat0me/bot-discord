const Parser = require('rss-parser');
const { RichEmbed } = require('discord.js');

exports.fluxRss = async function (channel) {
    let parser = new Parser(
        {
            maxRedirects: 100
        });

    let feed = await parser.parseURL('http://feeds.feedburner.com/20minutes-ActuHightech?format=xml');

    feed.items.forEach(item => {

        const embed = new RichEmbed()
            .setTitle(item.title)
            .setColor(0x9FC5E8)
            .setURL(item.link)
            .setImage(item.enclosure.url)
            .setAuthor(feed.title)
            .setDescription(item.contentSnippet)
            .setTimestamp()
            .addField('Date', item.pubDate)
        ;

        channel.send(embed);
    });
};
