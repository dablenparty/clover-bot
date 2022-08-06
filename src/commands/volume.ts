import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "volume",
  aliases: ["v", "set", "set-volume"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    const volume = parseInt(args[0]);
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
    queue.setVolume(volume);
    message.channel.send(`${client.emotes.success} | Volume set to \`${volume}\``);
  },
};

export default command;
