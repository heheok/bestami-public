import redisClient from "../../redis";
import { getToDaysHoursMinsSecs } from "../../utils/datettime";

const NEXT_HAPPYHOUR_KEY = "happy-hour-next";

export const happyHourNext = async (bot, message) => {
  const presetHappyHourDate = parseInt(
    await redisClient.get(NEXT_HAPPYHOUR_KEY)
  );

  if (presetHappyHourDate) {
    return bot.reply(
      message,
      `Sıradaki happy hour ${getToDaysHoursMinsSecs(
        Math.abs(presetHappyHourDate)
      )} sonra başlayacak!!!`
    );
  } else {
    return bot.reply(
      message,
      `Yakınlarda happy hour yapılmayacakmış gibi görünüyor. :( :( :(`
    );
  }
};
