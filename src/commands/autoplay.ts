import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
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
          .setTitle(`Autoplay is now ${autoplay ? "on" : "off"}`)
          .setColor(autoplay ? Colors.Green : Colors.Red),
      ],
    });
  },
};

export default command;
