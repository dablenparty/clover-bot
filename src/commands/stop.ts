import { Colors, EmbedBuilder } from "discord.js";
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
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    await queue.stop();
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Stopped").setColor(Colors.Green)],
    });
  },
};

export default command;
