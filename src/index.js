import controller from "./controller";
import helpController from "./controllers/help";
import weatherController from "./controllers/weather/weather";
import desertAddController from "./controllers/desert/add";
import desertListController from "./controllers/desert/list";
import desertNextController from "./controllers/desert/next";
import desertRemoveController from "./controllers/desert/remove";
import desertStatusController from "./controllers/desert/status";

if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

var bot = controller
  .spawn({
    token: process.env.token
  })
  .startRTM();

var listensFor = "message_received,ambient";

controller.hears("^yard[ıi]m$", listensFor, helpController);
controller.hears("^hava durumu$", listensFor, weatherController);
controller.hears("^[sş][oö]biyet ekle (.*)", listensFor, desertAddController);
controller.hears("^[sşSŞ][oö]biyet listele$", listensFor, desertListController);
controller.hears(
  "^[sşSŞ][oö]biyet s[ıi]radaki$",
  listensFor,
  desertNextController
);
controller.hears("^[sşSŞ][oö]biyet durum$", listensFor, desertStatusController);
controller.hears(
  "^[sş][oö]biyet al[ıi]nd[ıi] (.*)",
  listensFor,
  desertRemoveController
);
