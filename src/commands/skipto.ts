import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skipto",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
      return;
    }
    if (!args[0]) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please specify a song number!").setColor("#ff0000")],
      });
      return;
    }
    const num = Number(args[0]);
    if (isNaN(num)) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please specify a valid song number!").setColor("#ff0000")],
      });
      return;
    }
    if (num >= queue.songs.length || num < 1) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please specify a valid song number!").setColor("#ff0000")],
      });
      return;
    }
    const song = await distubeClient.jump(message, num);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Skipped to ${song.name ?? "Unknown"}`).setColor("#00ff00")],
    });
  },
};

export default command;
