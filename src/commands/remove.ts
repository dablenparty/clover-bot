import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import config from "../../config.json";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";
import skip from "./skip";

const command: CloverCommand = {
  name: "remove",
  description: "Remove a song from the queue. Use with no arguments to remove the last song.",
  parameters: [
    {
      name: "song",
      description: "Queue position to remove",
      type: "number",
      optional: true,
    },
  ],
  aliases: ["rm"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    const query = args.length > 1 ? parseInt(args[0]) : queue.songs.length - 1;
    if (isNaN(query)) {
      throw new BadCommandArgsError("remove", `${args[0]} is not a valid number`);
    }
    if (query > queue.songs.length || query < 0) {
      throw new BadCommandArgsError("remove", `${query} is not a valid queue position`);
    }
    if (query === 0) {
      await skip.run(client, message, []);
    } else {
      const removedSong = queue.songs.splice(query, 1);
      await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${config.emoji.success} Removed song`)
            .setDescription(`${removedSong[0].name ?? "Unknown"} from the queue!`)
            .setColor(Colors.Green),
        ],
      });
    }
  },
};

export default command;
