import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "filter",
  aliases: ["filters"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
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
        embeds: [new EmbedBuilder().setDescription("Please provide a valid filter!").setColor("#ff0000")],
      });
      return;
    }
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Filters: ${queue.filters.size ? queue.filters.names.join(", ") : "off"}`)
          .setColor(queue.filters.size ? "#00ff00" : "#ff0000"),
      ],
    });
  },
};

export default command;
