import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skipto",
  description: "Skip to the specified song",
  parameters: [{ name: "song", description: "The song to skip to as a queue position", type: "number" }],
  aliases: ["st"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    if (!args[0]) {
      throw new BadCommandArgsError("skipto", "No song provided");
    }
    if (queue.songs.length === 1) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There are no upcoming songs!").setColor(Colors.Red)],
      });
      return;
    }
    const num = Number(args[0]);
    if (isNaN(num)) {
      throw new BadCommandArgsError("skipto", `${args[0]} is not a valid number`);
    }
    if (num >= queue.songs.length || num < 1) {
      throw new BadCommandArgsError("skipto", `${args[0]} is not a valid queue position`);
    }
    const song = await distubeClient.jump(message, num);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Skipped to ${song.name ?? "Unknown"}`).setColor(Colors.Green)],
    });
  },
};

export default command;
