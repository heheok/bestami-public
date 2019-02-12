import controller from "./controller";
import helpController from "./controllers/help";
import weatherController from "./controllers/weather/weather";
import dessertAddController from "./controllers/dessert/add";
import dessertListController from "./controllers/dessert/list";
import dessertNextController from "./controllers/dessert/next";
import dessertRemoveController from "./controllers/dessert/remove";
import dessertStatusController from "./controllers/dessert/status";

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
controller.hears("^[sş][oö]biyet ekle (.*)", listensFor, dessertAddController);
controller.hears("^[sşSŞ][oö]biyet listele$", listensFor, dessertListController);
controller.hears(
  "^[sşSŞ][oö]biyet s[ıi]radaki$",
  listensFor,
  dessertNextController
);
controller.hears("^[sşSŞ][oö]biyet durum$", listensFor, dessertStatusController);
controller.hears(
  "^[sş][oö]biyet al[ıi]nd[ıi] (.*)",
  listensFor,
  dessertRemoveController
);
