import { Colors, EmbedBuilder } from "discord.js";
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
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    if (queue.paused) {
      queue.resume();
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle("Resumed").setColor(Colors.Green)],
      });
      return;
    }
    queue.pause();
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Paused").setColor(Colors.Green)],
    });
  },
};

export default command;
