import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "volume",
  aliases: ["v", "set", "set-volume"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
    const volume = parseInt(args[0]);
    if (isNaN(volume))
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid volume number!").setColor("#ff0000")],
      });
    queue.setVolume(volume);
    message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Volume set to ${volume}`).setColor("#00ff00")],
    });
  },
};

export default command;
