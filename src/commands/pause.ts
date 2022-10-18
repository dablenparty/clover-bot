import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "pause",
  description: "Pause the current song",
  aliases: ["pause", "hold"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    let title = "Paused";
    if (queue.paused) {
      queue.resume();
      title = "Resumed";
    } else {
      queue.pause();
    }
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(title).setColor(Colors.Green)],
    });
  },
};

export default command;
