import redisClient from "../../redis";

export const dessertList = async (bot, message) => {
  const userList = await redisClient.get("desert-list");
  if (!userList) {
    return bot.reply(message, "Liste boş.");
  } else {
    const replyString = userList
      .map((userName, index) => `*${index + 1}* - ${userName}`)
      .join("\n");
    bot.reply(message, `Tatlı alacak kahramanlar;\n${replyString}`);
  }
};
