import controller from "./controller";
import { commands } from "./commands";
if (!process.env.token) {
  console.log("Error: Specify token in environment");
  process.exit(1);
}

var bot = controller
  .spawn({
    token: process.env.token
  })
  .startRTM();

commands.map(({ command, listensFor, targetController }) => {
  controller.hears(command, listensFor, targetController);
});
