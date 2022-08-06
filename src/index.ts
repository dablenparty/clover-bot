import { config } from "dotenv";
import loadCommands from "./commands/commands";
import discordClient from "./discord";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
config();
ffmpeg.setFfmpegPath(ffmpegPath);

if (!process.env.DISCORD_TOKEN) {
  console.error("DISCORD_TOKEN is not set!");
  process.exit(1);
}

loadCommands(discordClient);

discordClient.login(process.env.DISCORD_TOKEN);
