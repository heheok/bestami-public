var controller = require("../../controller");

var helpMessage = `I'm just a baby!`;

export default async (bot, messge) => {
  return bot.reply(message, helpMessage.replace(/'/g, "`"));
};
