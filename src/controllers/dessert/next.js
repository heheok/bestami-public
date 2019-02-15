import redisClient from "../../redis";
import { emotes } from "../../media/emotes";

export const dessertNext = async (bot, message) => {
  const userList = await redisClient.get("desert-list");
  if (!userList) {
    return bot.reply(message, "Liste boş.");
  } else {
    const imageList = emotes.dessertNext;
    const userName = userList[0];
    const gif = imageList[Math.floor(Math.random() * imageList.length)];
    return bot.reply(
      message,
      `Tatlı alma sırası sende ${userName}. \n` + `<${gif}|.>`
    );
  }
};
