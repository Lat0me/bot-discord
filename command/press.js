const Parser = require('rss-parser');
const { RichEmbed } = require('discord.js');
const Moment = require('moment');

exports.fluxRss = async function (channel) {
    let parser = new Parser(
        {
            maxRedirects: 100
        });

    let feed = await parser.parseURL('https://news.google.com/news/rss/search/section/q/langage%20d%C3%A9velopeur/langage%20d%C3%A9velopeur?hl=fr&gl=FR&ned=fr');

    feed.items.forEach(item => {
        console.log(item);
        let image = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Google_News_icon.png/221px-Google_News_icon.png";
        if (item.enclosure && item.enclosure.url) {
            image = item.enclosure.url;
        }

        let time = Moment.duration("00:02:00");
        let dateCompare = Moment().subtract(time);
        let date = Moment(item.isoDate);

        if (dateCompare.isBefore(date)) {
            const embed = new RichEmbed()
                .setTitle(item.title)
                .setColor(0x9FC5E8)
                .setURL(item.link)
                .setThumbnail(image)
                .setAuthor(feed.title)
                .setDescription(item.contentSnippet)
                .setTimestamp()
                .addField('Date', item.pubDate)
            ;

            channel.send(embed);
        }
    });
};
