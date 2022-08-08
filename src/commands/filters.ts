import { Colors, EmbedBuilder } from "discord.js";
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
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    const filter = args[0];
    if (filter === "off" && queue.filters.size) queue.filters.clear();
    else if (Object.keys(distubeClient.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter);
      else queue.filters.add(filter);
    } else if (args[0]) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid filter!").setColor(Colors.Red)],
      });
      return;
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
