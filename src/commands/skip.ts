import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "skip",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    try {
      const song = await queue.skip();
      message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`);
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`);
    }
  },
};

export default command;
