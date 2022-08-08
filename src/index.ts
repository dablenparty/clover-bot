import { config } from "dotenv";
config();
import loadCommands from "./commands/commands";
import discordClient from "./discord";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { ActivityType } from "discord.js";
ffmpeg.setFfmpegPath(ffmpegPath);

(async () => {
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

  try {
    await discordClient.login(process.env.DISCORD_TOKEN);
    const statusText = process.env.STATUS_TEXT;
    if (statusText) discordClient.user?.setActivity({ name: statusText ?? "", type: ActivityType.Listening });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
