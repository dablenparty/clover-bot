import { Colors, EmbedBuilder } from "discord.js";
import formatDuration from "format-duration";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import config from "../../config.json";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

// how long the timeline can be, in characters
const MAX_TIMELINE_LENGTH = 52;

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
      throw new EmptyQueueError();
    }
    const maxPages = Math.ceil((queue.songs.length - 1) / 10);
    // effective pagination
    let page = 0;
    if (args.length > 0) {
      const fromArgs = parseInt(args[0]);
      if (!isNaN(fromArgs)) page = fromArgs - 1;
    }
    // saturate pages between 0 and maxPages
    // multiply by 10 because there are (max) 10 songs per page
    // add one for the song that is currently playing
    page = Math.max(0, Math.min(page, maxPages - 1)) * 10 + 1;
    const nowPlaying = queue.songs[0];
    const thisPage = queue.songs.slice(page, page + 10);
    let queueString = `${config.emoji.play} ${nowPlaying.name}\n${makeTimeline(
      queue.currentTime,
      nowPlaying.duration,
    )}\n\n**Total time remaining:** \`${queue.formattedDuration}\`\n\n**Up next:**\n`;
    const mappedPage = thisPage.map((song, i) => `${i + page}) \`${song.name}\` - \`${song.formattedDuration}\``);
    queueString += mappedPage.length === 0 ? "Nothing!" : mappedPage.join("\n");
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${config.emoji.queue} ${message.guild?.name ?? "This Server"}'s Queue`)
          .setDescription(queueString)
          .setFooter({ text: `Page ${Math.floor(page / 10) + 1}/${maxPages}` })
          .setColor(Colors.Green),
      ],
    });
  },
};

function makeTimeline(currentTime: number, duration: number): string {
  const progress = currentTime / duration;
  const currentTimeString = formatDuration(currentTime * 1000);
  const durationString = formatDuration(duration * 1000);
  const charsLeft = MAX_TIMELINE_LENGTH - currentTimeString.length - durationString.length;
  const filled = Math.floor(progress * charsLeft);
  const empty = charsLeft - filled;
  return `\`${currentTimeString}\` [${"=".repeat(filled)}${"-".repeat(empty)}] \`${durationString}\``;
}

export default command;
