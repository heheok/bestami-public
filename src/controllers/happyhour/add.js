import redisClient from "../../redis";
import { getDaysHoursMinsSecs } from "../../utils/datettime";

const yes = false;

const NEXT_HAPPYHOUR_KEY = "happy-hour-next";

const setNextDate = async dateToAdd => {
  const [dateSection, hourSection] = dateToAdd.split(" ");
  const [gg, aa, yyyy] = dateSection.split("/");
  const [hh, mm] = hourSection.split(":");

  const partyTimeStamp = Math.floor(
    new Date(`${yyyy}-${aa}-${gg} ${hh}:${mm}:00.000`).getTime() / 1000
  );
  console.log(`${yyyy}-${aa}-${gg} ${hh}:${mm}`);
  const currentTimeStamp = new Date().getTime() / 1000;
  console.log(currentTimeStamp > partyTimeStamp);
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
    //check date formatting
    const dateRegEx = /\d{1,2}[/]\d{1,2}[/]\d{4} \d{2}:\d{2}/;
    const matchedDate = dateToAdd.match(dateRegEx);

    if (!matchedDate) {
      return bot.reply(
        message,
        `Verdiğin tarihin formatını anlayamadım. GG/AA/YYYY HH:MM formatında tekrar dener misin? ${matchedDate}`
      );
    } else {
      //check if there is already a date on redis
      const presetHappyHourDate = parseInt(
        await redisClient.get(NEXT_HAPPYHOUR_KEY)
      );
      if (presetHappyHourDate && currentTimeStamp < presetHappyHourDate) {
        const timeLeftToNext = Math.floor(
          presetHappyHourDate - currentTimeStamp
        );
        //ask if user wants to update it
        bot.startConversation(message, function(err, convo) {
          convo.addQuestion(
            `Daha önce başka bir tarih belirlenmiş, bu bilgiye göre sıradaki happy hour ${getDaysHoursMinsSecs(
              timeLeftToNext
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
              }
              convo.next();
            },
            {},
            "default"
          );
        });
      } else {
        // no date on redis or the date is in the past
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
