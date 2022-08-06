import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "stop",
  aliases: ["disconnect", "leave", "clear"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
      return;
    }
    await queue.stop();
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Stopped").setColor("#00ff00")],
    });
  },
};

export default command;
