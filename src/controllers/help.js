var controller = require("../controller");

var helpMessage = `I'm just a baby!`;

module.exports = function(bot, message) {
  bot.reply(message, helpMessage.replace(/'/g, "`"));
};
