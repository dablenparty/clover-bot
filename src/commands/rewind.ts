import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "rewind",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Please provide time (in seconds) to go rewind!`);
    }
    const time = Number(args[0]);
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
    queue.seek(queue.currentTime - time);
    message.channel.send(`Rewinded the song for ${time}!`);
  },
};

export default command;
