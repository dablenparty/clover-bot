import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import config from "../../config.json";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "resume",
  description: "Resumes the current song",
  aliases: ["resume", "unpause"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    if (queue.paused) {
      queue.resume();
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle(`${config.emoji.play} Resumed`).setColor(Colors.Green)],
      });
    } else {
      throw new Error("The queue is not paused");
    }
  },
};

export default command;
