import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "queue",
  description: "Shows the current queue",
  parameters: [
    {
      name: "page",
      description: "The page of the queue to show",
      type: "number",
      optional: true,
    },
  ],
  aliases: ["q"],
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    const maxPages = Math.ceil(queue.songs.length / 10);
    // effective pagination
    let page = 0;
    if (args.length >= 0) {
      const fromArgs = parseInt(args[0]);
      if (!isNaN(fromArgs)) page = fromArgs - 1;
    }
    // saturate pages between 0 and maxPages
    // multiply by 10 because there are (max) 10 songs per page
    // add one for the song that is currently playing
    page = Math.max(0, Math.min(page, maxPages - 1)) * 10 + 1;
    const nowPlaying = queue.songs[0];
    const thisPage = queue.songs.slice(page, page + 10);
    // TODO: show time left
    let queueString = `**Now playing:** ${nowPlaying.name}\n\n**Up next:**\n`;
    const mappedPage = thisPage.map((song, i) => `${i + page}) \`${song.name}\` - \`${song.formattedDuration}\``);
    queueString += mappedPage.length === 0 ? "Nothing!" : mappedPage.join("\n");
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${message.guild?.name ?? "This Server"}'s Queue`)
          .setDescription(queueString)
          .setFooter({ text: `Page ${Math.floor(page / 10) + 1}/${maxPages}` })
          .setColor(Colors.Green),
      ],
    });
  },
};

export default command;
