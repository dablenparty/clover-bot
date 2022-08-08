import { Colors, EmbedBuilder } from "discord.js";
import { DisTubeError } from "distube";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skip",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    let song;
    try {
      song = await queue.skip();
    } catch (e: any) {
      if (e instanceof DisTubeError && e.code === "NO_UP_NEXT") {
        await queue.stop();
      } else {
        await message.channel.send({
          embeds: [new EmbedBuilder().setTitle("Error").setDescription(e).setColor(Colors.Red)],
        });
        return;
      }
    }
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle("Skipped!").setColor("#00ff00")],
    });
  },
};

export default command;
