const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { defaultColor, successEmojiUrl } = require('../config.json')

module.exports = {
    data:
        new SlashCommandBuilder()
            .setName('ping')
            .setDescription(`Replies with the Bot's Ping.`)
    ,

    run: ({ interaction, client }) => {

        let embed = new EmbedBuilder()
            .setAuthor({
                iconURL: successEmojiUrl,
                name: 'Pong!'
            })
            .setDescription(`My Ping is **${client.ws.ping} ms**.`)
            .setColor(defaultColor)
            .setFooter({
                iconURL: interaction.user.displayAvatarURL(),
                text: `Requested by ${interaction.user.username}.`
            })

            interaction.reply({ embeds: [embed] });

    },

    options: {
        devOnly: false
    }
}