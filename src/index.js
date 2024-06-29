const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const { token } = require("./config.json");
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    skipBuiltInValidations: true,
    bulkRegister: true,
});

client.login(token);