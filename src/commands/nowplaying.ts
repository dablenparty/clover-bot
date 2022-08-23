import { Colors, EmbedBuilder } from "discord.js";
import formatDuration from "format-duration";
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
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    const song = queue.songs[0];
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Now Playing: ${song.name ?? "Unknown"}`)
          .setDescription(
            `${formatDuration((song.duration - queue.currentTime) * 1000)} remaining\nQueued by \`${
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
