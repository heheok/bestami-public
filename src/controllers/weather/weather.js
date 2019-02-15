import getJSON from "get-json";

export const weatherController = async (bot, message) => {
  try {
    await getJSON(
      "https://api.darksky.net/forecast/bd2d003b62c3f5e5dcdc63fee8b79052/40.990598,%2029.074888?lang=tr&units=si",
      (error, response) => {
        const {
          currently: { temperature, apparentTemperature, summary, windSpeed }
        } = response;
        bot.reply(
          message,
          `Göztepe Nidakule'de Hava Durumu:\nSıcaklık: *${temperature} °C* (Hissedilen: ${apparentTemperature} °C)\n${summary}\nRüzgar Hızı: *${windSpeed} km/s*`
        );
      }
    );
  } catch (err) {
    bot.reply(
      message,
      "Havayı şu an koklayamıyorum. Lütfen daha sonra tekrar deneyin."
    );
  }
};
