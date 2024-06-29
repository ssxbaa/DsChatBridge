const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { defaultColor, ownerIDs, successEmojiUrl } = require('../config.json');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Use the command to configure basic things about the Chat Bridge functionality.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('addchannel')
                .setDescription('Adds a channel where the Bot will be forwarding to.')
                .addStringOption((option) =>
                    option
                        .setName('channelid')
                        .setDescription('The ID of the channel.')
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('removechannel')
                .setDescription('Removes a channel from forwarding.')
                .addStringOption((option) =>
                    option
                        .setName('channelid')
                        .setDescription('The ID of the channel.')
                        .setRequired(true)
                )
        ),

    run: async ({ interaction }) => {

        let embed = new EmbedBuilder()
            .setAuthor({
                iconURL: successEmojiUrl,
                name: 'Done!'
            })
            .setColor(defaultColor)
            .setFooter({
                text: `Change made by ${interaction.user.username}.`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true, format: 'png' })
            })

        if (ownerIDs.indexOf(interaction.user.id) === -1) {
            interaction.reply({ content: 'You are not a Bot Owner, therefore, you cannot access this function.', ephemeral: true });
        }

        if (interaction.options.getSubcommand() === 'addchannel') {

            let channelsData = {};

            try {
                const channelsFile = fs.readFileSync(path.join(__dirname, '../channels.json'), 'utf8');
                channelsData = JSON.parse(channelsFile);
            } catch (error) {
                console.error('Error reading channels.json:', error);
                return interaction.reply('An error occurred while reading channels.', { ephemeral: true });
            }

            const channelId = interaction.options.getString('channelid')
            if (!(channelsData.channels.indexOf(channelId) === -1)) {
                return interaction.reply({ content: 'The channel is already set up to forward the messages.', ephemeral: true });
            }
            channelsData.channels.push(channelId);

            fs.writeFile('./channels.json', JSON.stringify(channelsData, null, 2), (err) => {
                if (err) {
                    console.error('Error saving channels.json:', err);
                    return interaction.reply({ content: 'An error occurred while adding the channel ID.', ephemeral: true });
                }
                embed.setDescription(
                    '**Added Channel with ID `' + channelId + '`!**' +
                    '\nMake sure to reload the bot to make the changes apply!'
                )
                interaction.reply({ embeds: [embed] });
            });

        }

        if (interaction.options.getSubcommand() === 'removechannel') {

            let channelsData = {};

            try {
                const channelsFile = fs.readFileSync(path.join(__dirname, '../channels.json'), 'utf8');
                channelsData = JSON.parse(channelsFile);
            } catch (error) {
                console.error('Error reading channels.json:', error);
                return interaction.reply({ content: 'An error occurred while reading channels.', ephemeral: true });
            }

            const channelId = interaction.options.getString('channelid')
            if (channelsData.channels.indexOf(channelId) === -1) {
                return interaction.reply({ content: 'The channel already is not set up to forward the messages.', ephemeral: true });
            }
            const index = channelsData.channels.indexOf(channelId)
            channelsData.channels.splice(index, 1);

            fs.writeFile('./channels.json', JSON.stringify(channelsData, null, 2), (err) => {
                if (err) {
                    console.error('Error saving channels.json:', err);
                    return interaction.reply({ content: 'An error occurred while removing the channel ID.', ephemeral: true });
                }
                embed.setDescription(
                    '**Removed Channel with ID `' + channelId + '`!**' +
                    '\nMake sure to reload the bot to make the changes apply!'
                )
                interaction.reply({ embeds: [embed] });
            });

        }

    },


    options: {
        devOnly: false
    }
};