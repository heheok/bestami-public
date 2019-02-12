import redisClient from "../../redis";
const imageList = [
  "https://gastronomirehberi.files.wordpress.com/2017/06/animation.gif?w=200",
  "https://media.giphy.com/media/i8QecUHYrVMl2/giphy.gif",
  "https://3.bp.blogspot.com/-oG5AiBSKmYU/WBmYNtv_f3I/AAAAAAAAKCM/5UXFhzEvMd0ZD4yGP8JA3FE6v1RjmnjbwCLcB/s1600/izmir_lokma_tam35.blogspot.com.gif",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr08/14/13/anigif_enhanced-9976-1397495779-8.gif?downsize=800:*&output-format=auto&output-quality=auto",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr05/14/13/anigif_enhanced-19955-1397495916-22.gif?downsize=800:*&output-format=auto&output-quality=auto",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr04/14/13/anigif_enhanced-26487-1397496871-7.gif?downsize=800:*&output-format=auto&output-quality=auto",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr08/14/13/anigif_enhanced-18667-1397496981-1.gif?downsize=800:*&output-format=auto&output-quality=auto",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr03/14/13/anigif_enhanced-531-1397497230-2.gif?downsize=800:*&output-format=auto&output-quality=auto",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr07/14/13/anigif_enhanced-14173-1397497966-5.gif?downsize=800:*&output-format=auto&output-quality=auto",
  "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/enhanced/webdr03/14/13/anigif_enhanced-403-1397497457-16.gif?downsize=800:*&output-format=auto&output-quality=auto"
];
export default async (bot, message) => {
  const userList = await redisClient.get("desert-list");
  if (!userList) {
    return bot.reply(message, "Liste boş.");
  } else {
    const userName = userList[0];
    const gif = imageList[Math.floor(Math.random() * imageList.length)];
    return bot.reply(
      message,
      `Şöbiyet alma sırası sende ${userName}. \n` + `<${gif}|.>`
    );
  }
};
