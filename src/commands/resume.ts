import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "resume",
  aliases: ["resume", "unpause"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
    if (queue.paused) {
      queue.resume();
      message.channel.send({
        embeds: [new EmbedBuilder().setTitle("Resumed").setColor("#00ff00")],
      });
    } else {
      message.channel.send({
        embeds: [new EmbedBuilder().setTitle("Not paused").setColor("#ff0000")],
      });
    }
  },
};

export default command;
