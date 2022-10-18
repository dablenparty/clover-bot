import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";
import play from "./play";

const command: CloverCommand = {
  name: "multiplay",
  description: "Play (or queue) multiple songs at once",
  parameters: [
    {
      name: "songs",
      description: "The songs to play, either as a URL or a search term and separated by a comma",
      type: "string",
    },
  ],
  aliases: ["mp"],
  run: async (client, message, args) => {
    if (args.length < 1) {
      throw new BadCommandArgsError("multiplay", "No songs provided");
    }
    const songs = args
      .join(" ")
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);
    const queue = distubeClient.getQueue(message);
    if (!queue?.songs.length) {
      // adding multiple songs to an empty queue will bug out the bot
      // and only play the first song, so we just play the first song
      // and then add the rest to the queue
      // this seems to be an internal distube issue

      // songs should always be an array of length 1 or more at this point
      const firstSong = songs.shift()!;
      await play.run(client, message, [firstSong]);
    }
    const playPromises = songs.map((query) => play.run(client, message, [query]));
    const allSettledResult = await Promise.allSettled(playPromises);
    let successCount = 1; // the first song is already playing
    const errors: EmbedBuilder[] = [];
    for (let i = 0; i < allSettledResult.length; i++) {
      const result = allSettledResult[i];
      if (result.status === "fulfilled") {
        successCount++;
      } else {
        errors.push(
          new EmbedBuilder()
            .setTitle(`Error playing '${songs[i]}'`)
            .setDescription(`${result.reason}`)
            .setColor(Colors.Red),
        );
      }
    }
    if (errors.length > 0) {
      await message.channel.send({
        embeds: errors,
      });
    }
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Queued ${successCount} songs!`).setColor(Colors.Green)],
    });
  },
};

export default command;
