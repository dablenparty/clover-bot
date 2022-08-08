import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "remove",
  aliases: ["rm"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    if (args.length === 0) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a number to remove!").setColor(Colors.Red)],
      });
      return;
    }
    const query = args[0];
    const asNum = parseInt(query);
    if (isNaN(asNum)) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid number!").setColor(Colors.Red)],
      });
      return;
    }
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    if (asNum > queue.songs.length || asNum < 1) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid number!").setColor(Colors.Red)],
      });
      return;
    }
    const removedSong = queue.songs.splice(asNum, 1);
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Removed song ${removedSong[0].name ?? "Unknown"} from the queue!`)
          .setColor("#00ff00"),
      ],
    });
  },
};

export default command;
