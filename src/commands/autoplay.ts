import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import config from "../../config.json";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "autoplay",
  description: "Toggles autoplay",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const autoplay = queue.toggleAutoplay();
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Autoplay is now ${autoplay ? `on ${config.emoji.play} ` : `off ${config.emoji.stop}`}`)
          .setColor(autoplay ? Colors.Green : Colors.Red),
      ],
    });
  },
};

export default command;
