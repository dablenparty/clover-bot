import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "shuffle",
  description: "Shuffles the queue",
  aliases: ["sh"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    queue.shuffle();
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Shuffled").setColor(Colors.Green)],
    });
  },
};

export default command;
