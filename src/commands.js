import { help, deprecated } from "./controllers/help";
import { weatherController } from "./controllers/weather";
import {
  dessertAdd,
  dessertList,
  dessertNext,
  dessertRemove,
  dessertStatus
} from "./controllers/dessert";
import { happyHourAdd } from "./controllers/happyhour";

const listensFor = "message_received,ambient";

export const commands = [
  {
    command: "^yard[ıi]m$",
    listensFor,
    targetController: help
  },
  {
    command: "^[SŞsş][oö]biyet",
    listensFor,
    targetController: deprecated
  },
  {
    command: "^hava durumu$",
    listensFor,
    targetController: weatherController
  },
  {
    command: "^[Tt]atl[ıi] ekle (.*)",
    listensFor,
    targetController: dessertAdd
  },
  {
    command: "^[Tt]atl[ıi] listele$",
    listensFor,
    targetController: dessertList
  },
  {
    command: "^[Tt]atl[ıi] s[ıi]radaki$",
    listensFor,
    targetController: dessertNext
  },
  {
    command: "^[Tt]atl[ıi] durum$",
    listensFor,
    targetController: dessertStatus
  },
  {
    command: "^[Tt]atl[ıi] al[ıi]nd[ıi] (.*)",
    listensFor,
    targetController: dessertRemove
  },
  {
    command: ["^[Pp]arti ekle (.*)", "^[Pp]arti ekle"],
    listensFor,
    targetController: happyHourAdd
  }
];
