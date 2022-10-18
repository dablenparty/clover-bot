import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "stop",
  description: "Stops the queue",
  aliases: ["disconnect", "leave", "clear"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    await queue.stop();
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Stopped").setColor(Colors.Green)],
    });
  },
};

export default command;
