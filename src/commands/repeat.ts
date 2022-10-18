import { Colors, EmbedBuilder } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "repeat",
  description: "Set the repeat mode",
  parameters: [
    {
      name: "mode",
      description: "The repeat mode. Values are: `off`, `song`, and `queue`",
      type: "string",
      optional: true,
    },
  ],
  aliases: ["loop", "rp"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      throw new EmptyQueueError();
    }
    let mode;
    switch (args[0]) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
    mode = queue.setRepeatMode(mode);
    mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Repeat mode is now ${mode}`).setColor(Colors.Green)],
    });
  },
};

export default command;
