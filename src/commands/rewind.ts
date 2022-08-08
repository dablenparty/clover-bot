import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "rewind",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    if (!args[0]) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a number of seconds to skip!").setColor(Colors.Red)],
      });
      return;
    }
    const time = Number(args[0]);
    if (isNaN(time)) {
      await message.channel.send({
        embeds: [
          new EmbedBuilder().setDescription("Please provide a valid number of seconds to skip!").setColor(Colors.Red),
        ],
      });
      return;
    }
    queue.seek(queue.currentTime - time);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Seeking backward ${time} seconds`).setColor(Colors.Green)],
    });
  },
};

export default command;
