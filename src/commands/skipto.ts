import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skipto",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Please provide time (in seconds) to go rewind!`);
    }
    const num = Number(args[0]);
    if (isNaN(num)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
    await distubeClient.jump(message, num).then((song) => {
      message.channel.send({ content: `Skipped to: ${song.name}` });
    });
  },
};

export default command;
