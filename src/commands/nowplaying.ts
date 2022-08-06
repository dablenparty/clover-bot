import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "nowplaying",
  aliases: ["np"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send({
      embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
    });
    const song = queue.songs[0];
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Now Playing: ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setThumbnail(song.thumbnail ?? null)
          .setColor("#00ff00"),
      ],
    });
  },
};

export default command;
