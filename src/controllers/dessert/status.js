import redisClient from "../../redis";
const imageList = [
  "https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy-downsized.gif",
  "https://media.giphy.com/media/oT7ATDykMidsk/giphy-tumblr.gif",
  "https://media.giphy.com/media/5Ndmw9PBRVO4o/giphy-downsized.gif",
  "https://media.giphy.com/media/5wWf7H0qoWaNnkZBucU/giphy-downsized.gif",
  "https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy-downsized.gif",
  "https://media.giphy.com/media/j9UHmOnjCNrIDZRoTe/giphy-downsized.gif",
  "https://media.giphy.com/media/Emg9qPKR5hquI/giphy-downsized.gif",
  "https://media.giphy.com/media/cqf5wzvVMiYDe/giphy-downsized.gif",
  "https://media.giphy.com/media/M5zhoj9rhwkhy/giphy-downsized.gif",
  "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy-downsized.gif",
  "https://media.giphy.com/media/xUPGcFEihKM3MczWE0/giphy-downsized.gif"
];

const getDaysHoursMinsSecs = from => {
  const now = Math.floor(new Date() / 1000);
  let seconds = now - from;
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  const mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;

  return `${days} gün, ${hrs} saat, ${mnts} dakika, ${seconds} saniyedir`;
};

export default async (bot, message) => {
  const lastBought = await redisClient.get("desert-last-bought");
  const gif = imageList[Math.floor(Math.random() * imageList.length)];
  return bot.reply(
    message,
    `Bu iş yerinde ${getDaysHoursMinsSecs(lastBought)} tatlı görülmedi...\n` +
      `<${gif}|.>`
  );
};
