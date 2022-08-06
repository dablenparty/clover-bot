import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "autoplay",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
      return;
    }
    const autoplay = queue.toggleAutoplay();
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Autoplay is now ${autoplay ? "on" : "off"}`)
          .setColor(autoplay ? "#00ff00" : "#ff0000"),
      ],
    });
  },
};

export default command;
