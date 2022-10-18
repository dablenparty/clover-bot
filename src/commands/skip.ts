import { Colors, EmbedBuilder } from "discord.js";
import { DisTubeError } from "distube";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skip",
  description: "Skip to the next song",
  aliases: ["next", "s"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    try {
      await queue.skip();
    } catch (e: any) {
      if (e instanceof DisTubeError && e.code === "NO_UP_NEXT") {
        await queue.stop();
      } else {
        throw e;
      }
    }
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Skipped!").setColor(Colors.Green)],
    });
  },
};

export default command;
