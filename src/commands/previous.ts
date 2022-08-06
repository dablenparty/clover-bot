import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "previous",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
      return;
    }
    const song = await queue.previous();
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Previous: ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setThumbnail(song.thumbnail ?? null)
          .setColor("#00ff00"),
      ],
    });
  },
};

export default command;
