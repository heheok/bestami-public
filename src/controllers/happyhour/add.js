import redisClient from "../../redis";
import { getDaysHoursMinsSecs } from "../../utils/datettime";

const NEXT_HAPPYHOUR_KEY = "happy-hour-next";

const setNextDate = async dateToAdd => {
  const [dateSection, hourSection] = dateToAdd.split(" ");
  const [gg, aa, yyyy] = dateSection.split("/");
  const [hh, mm] = hourSection.split(":");

  const partyTimeStamp = Math.floor(
    new Date(`${yyyy}-${aa}-${gg} ${hh}:${mm}:00.000`).getTime() / 1000
  );
  const currentTimeStamp = new Date().getTime() / 1000;
  if (currentTimeStamp > partyTimeStamp) {
    return false;
  } else {
    await redisClient.set(NEXT_HAPPYHOUR_KEY, partyTimeStamp);
    return true;
  }
};

export const happyHourAdd = async (bot, message) => {
  const dateToAdd = message.match[1];
  const currentTimeStamp = new Date().getTime() / 1000;

  if (dateToAdd) {
    const dateRegEx = /\d{1,2}[/]\d{1,2}[/]\d{4} \d{2}:\d{2}/;
    const matchedDate = dateToAdd.match(dateRegEx);

    if (!matchedDate) {
      return bot.reply(
        message,
        `Verdiğin tarihin formatını anlayamadım. GG/AA/YYYY HH:MM formatında tekrar dener misin? ${matchedDate}`
      );
    } else {
      const presetHappyHourDate = parseInt(
        await redisClient.get(NEXT_HAPPYHOUR_KEY)
      );
      if (presetHappyHourDate && currentTimeStamp < presetHappyHourDate) {
        bot.startConversation(message, function(err, convo) {
          convo.addQuestion(
            `Daha önce başka bir tarih belirlenmiş, bu bilgiye göre sıradaki happy hour ${getToDaysHoursMinsSecs(
              Math.abs(presetHappyHourDate)
            )} sonra yapılacak. Güncellemek ister misiniz? (Evet/Hayır)`,
            async ({ text }, convo) => {
              switch (text) {
                case "evet":
                case "Evet":
                  const dateSet = await setNextDate(dateToAdd);
                  if (dateSet) {
                    convo.say("Tamamdır, güncelledim.");
                  } else {
                    convo.say(
                      "Verdiğin tarih geçmişte. Kontrol edip tekrar dener misin?"
                    );
                  }
                  break;
                case "hayır":
                case "hayir":
                case "Hayır":
                case "Hayir":
                  convo.say("Tamamdır, bir değişiklik yapmadım.");
                  break;
                default:
                  convo.say(
                    "Sadece evet/hayır komutunu anlayabiliyorum. Tekrar başlaman gerekecek."
                  );
                  break;
              }
              convo.next();
            },
            {},
            "default"
          );
        });
      } else {
        const dateSet = setNextDate(dateToAdd);
        if (dateSet) {
          return bot.reply(message, `Teşekkür ederim, tarihi kaydettim.`);
        } else {
          return bot.reply(
            message,
            `Verdiğin tarih geçmişte. Kontrol edip tekrar dener misin?`
          );
        }
      }
    }
  } else {
    bot.reply(
      message,
      `Bu komutla birlikte GG/AA/YYYY HH:MM formatında bir tarih vermeniz gerekiyor.`
    );
  }
};
