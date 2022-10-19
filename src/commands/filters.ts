import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "filter",
  description: "Apply a filter",
  parameters: [
    {
      name: "filter",
      description: "The filter to apply",
      type: "string",
    },
  ],
  aliases: ["filters"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const filter = args[0];
    if (filter === "off" && queue.filters.size) queue.filters.clear();
    else if (Object.keys(distubeClient.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter);
      else queue.filters.add(filter);
    } else if (args[0]) {
      throw new BadCommandArgsError("filter", "Invalid filter provided");
    }
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Filters: ${queue.filters.size ? queue.filters.names.join(", ") : "off"}`)
          .setColor(queue.filters.size ? Colors.Green : Colors.Red),
      ],
    });
  },
};

export default command;
