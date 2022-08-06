import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "repeat",
  aliases: ["loop", "rp"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
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
    message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Repeat mode is now ${mode}`).setColor("#00ff00")],
    });
  },
};

export default command;
