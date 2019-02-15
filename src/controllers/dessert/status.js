import redisClient from "../../redis";
import { emotes } from "../../media/emotes";
import { getPassedDaysHoursMinsSecs } from "../../utils/datettime";

export const dessertStatus = async (bot, message) => {
  const imageList = emotes.dessertStatus;
  const lastBought = await redisClient.get("desert-last-bought");
  const gif = imageList[Math.floor(Math.random() * imageList.length)];
  return bot.reply(
    message,
    `Bu iş yerinde ${getPassedDaysHoursMinsSecs(
      lastBought,
      true
    )}'dir tatlı görülmedi...\n` + `<${gif}|.>`
  );
};
