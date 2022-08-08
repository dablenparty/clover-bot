import { Colors, EmbedBuilder } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "volume",
  description: "Sets the volume of the player",
  parameters: [
    {
      name: "volume",
      description: "The volume to set the player to",
      type: "number",
    },
  ],
  aliases: ["v", "set", "set-volume"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("There is nothing in the queue right now!").setColor(Colors.Red)],
      });
      return;
    }
    const volume = parseInt(args[0]);
    if (isNaN(volume)) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a valid volume number!").setColor(Colors.Red)],
      });
      return;
    }
    queue.setVolume(volume);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Volume set to ${volume}`).setColor(Colors.Green)],
    });
  },
};

export default command;
