import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "seek",
  description: "Seek to a specific time in the current song",
  parameters: [
    {
      name: "time",
      description: "The time to seek to (in seconds)",
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
      throw new BadCommandArgsError("seek", "No time provided");
    }

    const time = Number(args[0]);
    if (isNaN(time)) {
      throw new BadCommandArgsError("seek", `${args[0]} is not a valid number`);
    }
    queue.seek(time);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Seeking to ${time} seconds`).setColor(Colors.Green)],
    });
  },
};

export default command;
