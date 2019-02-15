import redisClient from "../../redis";

export const dessertAdd = async (bot, message) => {
  const userToAdd = message.match[1];
  if (userToAdd) {
    const userList = await redisClient.get("desert-list");
    if (!userList) {
      await redisClient.set("desert-list", [userToAdd]);
    } else {
      const userInList = userList.find(user => user === userToAdd);
      if (!!userInList) {
        return bot.reply(message, "Bu scottyzen zaten listede. İnsaf... ");
      }
      await redisClient.set("desert-list", [...userList, userToAdd]);
    }
    bot.reply(message, `${userToAdd} Tatlı listesine eklendin.`);
  } else {
    bot.reply(message, `Hangi scottyzen'i ekliyoruz?`);
  }
};
