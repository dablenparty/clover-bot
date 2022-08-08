import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "seek",
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
    queue.seek(time);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Seeking to ${time} seconds`).setColor("#00ff00")],
    });
  },
};

export default command;
