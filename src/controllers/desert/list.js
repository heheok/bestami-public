import redisClient from '../../redis';

export default async (bot, message) => {
  const userList = await redisClient.get('desert-list');
  if (!userList) {
    return bot.reply(message, 'Liste boş.');
  } else {
    const replyString = userList
      .map((userName, index) => `*${index + 1}* - ${userName}`)
      .join('\n');
    bot.reply(message, `Şöbiyet alacak kahramanlar;\n${replyString}`);
  }
};
