import { config } from "dotenv";
import loadCommands from "./commands/commands";
import discordClient from "./discord/client";
config();

if (!process.env.DISCORD_TOKEN) {
  console.error("DISCORD_TOKEN is not set!");
  process.exit(1);
}

loadCommands(discordClient);

discordClient.login(process.env.DISCORD_TOKEN);
