import redisClient from "../../redis";
import { emotes } from "../../media/emotes";
import { getDaysHoursMinsSecs } from "../../utils/datettime";

export const dessertStatus = async (bot, message) => {
  const imageList = emotes.dessertStatus;
  const lastBought = await redisClient.get("desert-last-bought");
  const gif = imageList[Math.floor(Math.random() * imageList.length)];
  return bot.reply(
    message,
    `Bu iş yerinde ${getDaysHoursMinsSecs(
      lastBought
    )}'dir tatlı görülmedi...\n` + `<${gif}|.>`
  );
};
