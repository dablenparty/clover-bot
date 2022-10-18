import { Colors, EmbedBuilder } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import EmptyQueueError from "../@types/errors/EmptyQueue";
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
      throw new EmptyQueueError();
    }
    const volume = parseInt(args[0]);
    if (isNaN(volume)) {
      throw new BadCommandArgsError("volume", `${args[0]} is not a valid number`);
    }
    queue.setVolume(volume);
    await message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`Volume set to ${volume}`).setColor(Colors.Green)],
    });
  },
};

export default command;
