import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "autoplay",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
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
