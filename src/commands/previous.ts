import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "previous",
  description: "Show the previous song",
  aliases: ["prev"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const song = await queue.previous();
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Previous: ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setThumbnail(song.thumbnail ?? null)
          .setColor(Colors.Green),
      ],
    });
  },
};

export default command;
