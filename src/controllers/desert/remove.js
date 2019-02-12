import redisClient from "../../redis";

const imageList = [
  "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy-downsized.gif",
  "https://media.giphy.com/media/BlVnrxJgTGsUw/giphy-downsized.gif",
  "https://media.giphy.com/media/ZFTKZ8zwj38gE/giphy-downsized.gif",
  "https://media.giphy.com/media/IcGkqdUmYLFGE/giphy-downsized.gif",
  "https://media.giphy.com/media/4EF5xIO5yiivWh4gGn/giphy-downsized.gif",
  "https://media.giphy.com/media/1Z02vuppxP1Pa/giphy-downsized.gif",
  "https://media.giphy.com/media/WAfGpVI1pI3e/giphy-downsized.gif",
  "https://media.giphy.com/media/JJR2n3I7vVisE/giphy-downsized.gif",
  "https://media.giphy.com/media/U8bDgsXcnIEFy/giphy-downsized.gif",
  "https://media.giphy.com/media/10avZ0rqdGFyfu/giphy-downsized.gif",
  "https://media.giphy.com/media/KJ1f5iTl4Oo7u/giphy-downsized.gif",
  "https://media.giphy.com/media/HJ8NsNtn9VswE/giphy-downsized.gif"
];

export default async (bot, message) => {
  const userToRemove = message.match[1];
  if (userToRemove) {
    const userList = await redisClient.get("desert-list");
    if (!userList) {
      return bot.reply(
        message,
        "Şöbiyet almasını beklediğimiz kimse yoktu ki..."
      );
    } else {
      await redisClient.set(
        "desert-last-bought",
        Math.floor(new Date() / 1000)
      );
      const userInList = userList.find(user => user === userToRemove);
      const gif = imageList[Math.floor(Math.random() * imageList.length)];
      if (!userInList) {
        return bot.reply(
          message,
          `Şöbiyet almanı beklemiyorduk, ama yine de aldın, kahramanımızsın ${userToRemove}.\n <${gif}|.>`
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
          `Şöbiyetimizi aldığın için çok teşekkürler  ${userToRemove}, kahramanımızsın. \n <${gif}|.>`
        );
      }
    }
  } else {
    return bot.reply(message, "Kim aldı??");
  }
};
