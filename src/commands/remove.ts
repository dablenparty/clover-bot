import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "remove",
  description: "Remove a song from the queue",
  parameters: [
    {
      name: "song",
      description: "Queue position to remove",
      type: "number",
    },
  ],
  aliases: ["rm"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    if (args.length === 0) {
      throw new BadCommandArgsError("remove", "No song number provided");
    }
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const query = args[0];
    const asNum = parseInt(query);
    if (isNaN(asNum)) {
      throw new BadCommandArgsError("remove", `${query} is not a valid number`);
    }
    if (asNum > queue.songs.length || asNum < 1) {
      throw new BadCommandArgsError("remove", `${query} is not a valid queue position`);
    }
    const removedSong = queue.songs.splice(asNum, 1);
    await message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setDescription(`Removed song ${removedSong[0].name ?? "Unknown"} from the queue!`)
          .setColor(Colors.Green),
      ],
    });
  },
};

export default command;
