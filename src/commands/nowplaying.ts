import { Colors, EmbedBuilder } from "discord.js";
import formatDuration from "format-duration";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import config from "../../config.json";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "nowplaying",
  description: "Shows the currently playing song",
  aliases: ["np"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const song = queue.songs[0];
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${config.emoji.play} Now Playing: ${song.name ?? "Unknown"}`)
          .setDescription(
            `\`${formatDuration((song.duration - queue.currentTime) * 1000)}\` remaining\nQueued by \`${
              song.user?.tag ?? "Unknown"
            }\``,
          )
          .setURL(song.url)
          .setThumbnail(song.thumbnail ?? null)
          .setColor(Colors.Green),
      ],
    });
  },
};

export default command;
