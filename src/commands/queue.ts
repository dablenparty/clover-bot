import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
    const maxPages = Math.ceil(queue.songs.length / 10);
    // effective pagination
    let page = 0;
    if (args.length >= 0) {
      const fromArgs = parseInt(args[0]);
      if (!isNaN(fromArgs)) page = fromArgs - 1;
    }
    page = Math.max(0, Math.min(page, maxPages - 1)) * 10;
    const thisPage = queue.songs.slice(page, page + 10);
    const q = thisPage
      .map((song, i) => `${i === 0 ? "Playing:" : `${i + page}.`} \`${song.name}\` - \`${song.formattedDuration}\``)
      .join("\n");
    message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Queue:`)
          .setDescription(q)
          .setFooter({ text: `Page ${page / 10 + 1}/${maxPages}` })
          .setColor("#00ff00"),
      ],
    });
  },
};

export default command;
