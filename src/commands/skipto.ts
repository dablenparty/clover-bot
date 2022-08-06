import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skipto",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
    if (!args[0]) {
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please specify a song number!").setColor("#ff0000")],
      });
    }
    const num = Number(args[0]);
    if (isNaN(num))
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please specify a valid song number!").setColor("#ff0000")],
      });
    if (num >= queue.songs.length || num < 1)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please specify a valid song number!").setColor("#ff0000")],
      });
    const song = await distubeClient.jump(message, num);
    message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Skipped to ${song.name ?? "Unknown"}`).setColor("#00ff00")],
    });
  },
};

export default command;
