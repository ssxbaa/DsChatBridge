const { EmbedBuilder } = require("discord.js");
const { defaultColor } = require("../../config.json");
const { channels } = require("../../channels.json");

let channelsArray = channels;

module.exports = async (message, client) => {
    let channelId = message.channel.id;
    let filteredChannels = channelsArray.filter(id => id !== channelId);
    let embed = new EmbedBuilder()
        .setAuthor({
            iconURL: message.author.displayAvatarURL({ dynamic: true, format: 'png' }),
            name: message.author.username
        })
        .setColor(defaultColor)
        .setDescription(message.content || "No Content")
        .setFooter({
            iconURL: message.guild.iconURL({ dynamic: true, format: 'png' }),
            text: `Sent from ${message.guild.name}.`
        });

    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        let attachmentLinks = [];
        let index = 1;

        message.attachments.forEach(attachment => {
            attachmentLinks.push(`[Attachment ${index}](${attachment.url})`);
            index++;
        });

        embed.addFields({
            name: 'Attachments',
            value: attachmentLinks.join(', '),
            inline: true
        });
    }

    filteredChannels.forEach((item) => {
        client.guilds.cache.forEach(guild => {
            let targetChannel = guild.channels.cache.get(item);
            if (targetChannel) {
                targetChannel.send({ embeds: [embed] });
            }
        });
    });
};
