import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "move",
  aliases: ["mv"],
  run: async (client, message, args) => {
    if (args.length < 2) {
      await message.channel.send({
        embeds: [
          new EmbedBuilder().setDescription("Please provide a song number and number to move!").setColor("#ff0000"),
        ],
      });
      return;
    }
    const songNum = parseInt(args[0]);
    const moveNum = parseInt(args[1]);
    if (isNaN(songNum) || isNaN(moveNum)) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid number!").setColor("#ff0000")],
      });
      return;
    }
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
      return;
    }
    if (songNum > queue.songs.length || songNum < 1 || moveNum > queue.songs.length || moveNum < 1) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid number!").setColor("#ff0000")],
      });
      return;
    }
    const movedSong = queue.songs.splice(songNum, 1);
    queue.songs.splice(moveNum, 0, movedSong[0]);
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Moved song ${movedSong[0].name ?? "Unknown"} to position ${moveNum}!`)
          .setColor("#00ff00"),
      ],
    });
  },
};

export default command;
