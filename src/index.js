import controller from "./controller";
import helpController from "./controllers/help/help";
import deprecatedController from "./controllers/help/deprecated";
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
controller.hears("^[SŞsş][oö]biyet", listensFor, deprecatedController);

controller.hears("^[Tt]atl[ıi] ekle (.*)", listensFor, dessertAddController);
controller.hears("^[Tt]atl[ıi] listele$", listensFor, dessertListController);
controller.hears(
  "^[Tt]atl[ıi] s[ıi]radaki$",
  listensFor,
  dessertNextController
);
controller.hears("^[Tt]atl[ıi] durum$", listensFor, dessertStatusController);
controller.hears(
  "^[Tt]atl[ıi] al[ıi]nd[ıi] (.*)",
  listensFor,
  dessertRemoveController
);
