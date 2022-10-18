import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "rewind",
  description: "Rewinds the current song by a number of seconds",
  parameters: [
    {
      name: "seconds",
      description: "The number of seconds to rewind",
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
      throw new BadCommandArgsError("rewind", "No seconds provided");
    }
    const time = Number(args[0]);
    if (isNaN(time)) {
      throw new BadCommandArgsError("rewind", `${args[0]} is not a valid number`);
    }
    const timeToSeek = Math.min(queue.currentTime - time, 0);
    queue.seek(timeToSeek);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Seeking backward ${time} seconds`).setColor(Colors.Green)],
    });
  },
};

export default command;
