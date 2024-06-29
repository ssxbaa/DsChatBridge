const figlet = require("figlet");
const banner = figlet.textSync("DsChatBridge", {
    font: "Cosmike",
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
})

module.exports = (bot) => {
    console.log(banner)
    console.log(`Logged in as ${bot.user.username}!`);
};