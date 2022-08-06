import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "previous",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    const song = await queue.previous();
    message.channel.send(`${client.emotes.success} | Now playing:\n${song.name}`);
  },
};

export default command;
