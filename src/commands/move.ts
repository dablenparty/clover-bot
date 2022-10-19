import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "move",
  description: "Move a song to a different position in the queue",
  parameters: [
    {
      name: "song",
      description: "The song to move",
      type: "number",
    },
    {
      name: "position",
      description: "The position to move the song to",
      type: "number",
    },
  ],
  aliases: ["mv"],
  run: async (client, message, args) => {
    if (args.length < 2) {
      throw new BadCommandArgsError("move", "Not enough arguments provided");
    }
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const songNum = parseInt(args[0]);
    const moveNum = parseInt(args[1]);
    if (isNaN(songNum)) {
      throw new BadCommandArgsError("move", `Song '${args[0]}' is not a number`);
    } else if (isNaN(moveNum)) {
      throw new BadCommandArgsError("move", `Position ${args[1]} is not a number`);
    }
    if (songNum > queue.songs.length || songNum < 1) {
      throw new BadCommandArgsError("move", `Song ${songNum} is not in the queue`);
    } else if (moveNum > queue.songs.length || moveNum < 1) {
      throw new BadCommandArgsError("move", `Position ${moveNum} is not in the queue`);
    }
    const movedSong = queue.songs.splice(songNum, 1);
    queue.songs.splice(moveNum, 0, movedSong[0]);
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Moved song ${movedSong[0].name ?? "Unknown"} to position ${moveNum}!`)
          .setColor(Colors.Green),
      ],
    });
  },
};

export default command;
