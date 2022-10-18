import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "shuffle",
  description: "Shuffles the queue",
  aliases: ["sh"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    queue.shuffle();
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Shuffled").setColor(Colors.Green)],
    });
  },
};

export default command;
