import { Colors, EmbedBuilder } from "discord.js";
import { DisTubeError } from "distube";
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
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
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
