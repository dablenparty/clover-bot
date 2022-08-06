import { EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "seek",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor("#ff0000")],
      });
    if (!args[0]) {
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a number of seconds to skip!").setColor("#ff0000")],
      });
    }
    const time = Number(args[0]);
    if (isNaN(time))
      return message.channel.send({
        embeds: [
          new EmbedBuilder().setDescription("Please provide a valid number of seconds to skip!").setColor("#ff0000"),
        ],
      });
    queue.seek(time);
    message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Seeking to ${time} seconds`).setColor("#00ff00")],
    });
  },
};

export default command;
