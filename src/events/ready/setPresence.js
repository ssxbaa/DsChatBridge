const { channels } = require("../../channels.json")

module.exports = (bot, client ) => {
    client.user.setPresence({
        activities: [{
            name: `status`,
            state: `By ssxbaa on GitHub・Connecting ${channels.length} channels!`,
            type: 4
        }],
        status: 'online',
    });
};