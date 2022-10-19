import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "forward",
  description: "Skip forward a number of seconds",
  parameters: [
    {
      name: "seconds",
      description: "The number of seconds to skip",
      type: "number",
    },
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    if (!args[0]) {
      throw new BadCommandArgsError("forward", "No number of seconds provided");
    }
    const time = Number(args[0]);
    if (isNaN(time)) {
      throw new BadCommandArgsError("forward", "Invalid number of seconds provided");
    }
    queue.seek(queue.currentTime + time);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Seeking forward ${time} seconds`).setColor(Colors.Green)],
    });
  },
};

export default command;
