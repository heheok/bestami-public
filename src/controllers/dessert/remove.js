import redisClient from "../../redis";
import { emotes } from "../../media/emotes";

export const dessertRemove = async (bot, message) => {
  const userToRemove = message.match[1];
  if (userToRemove) {
    const userList = await redisClient.get("desert-list");
    if (!userList) {
      return bot.reply(
        message,
        "Tatlı almasını beklediğimiz kimse yoktu ki..."
      );
    } else {
      await redisClient.set(
        "desert-last-bought",
        Math.floor(new Date() / 1000)
      );
      const imageList = emotes.dessertRemove;
      const userInList = userList.find(user => user === userToRemove);
      const gif = imageList[Math.floor(Math.random() * imageList.length)];
      if (!userInList) {
        return bot.reply(
          message,
          `Tatlı almanı beklemiyorduk, ama yine de aldın, kahramanımızsın ${userToRemove}.\n <${gif}|.>`
        );
      } else {
        const newList = userList.filter(user => user != userToRemove);
        if (newList.length == 0) {
          await redisClient.delete("desert-list");
        } else {
          await redisClient.set("desert-list", newList);
        }
        return bot.reply(
          message,
          `Tatlı aldığın için çok teşekkürler  ${userToRemove}, kahramanımızsın. \n <${gif}|.>`
        );
      }
    }
  } else {
    return bot.reply(message, "Kim aldı??");
  }
};
