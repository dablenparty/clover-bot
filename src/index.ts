import { config } from "dotenv";
config();
import loadCommands from "./commands/commands";
import discordClient from "./discord";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
ffmpeg.setFfmpegPath(ffmpegPath);

if (!process.env.DISCORD_TOKEN) {
  console.error("DISCORD_TOKEN is not set!");
  process.exit(1);
}

try {
  loadCommands(discordClient);
} catch (e) {
  console.error(e);
  process.exit(1);
}

discordClient.login(process.env.DISCORD_TOKEN);
