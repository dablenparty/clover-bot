import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "pause",
  aliases: ["pause", "hold"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
    if (queue.paused) {
      queue.resume();
      return message.channel.send({
        embeds: [new EmbedBuilder().setTitle("Resumed").setColor("#00ff00")],
      });
    }
    queue.pause();
    message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Paused").setColor("#00ff00")],
    });
  },
};

export default command;
