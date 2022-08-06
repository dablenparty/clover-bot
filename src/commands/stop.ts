import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "stop",
  aliases: ["disconnect", "leave"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    queue.stop();
    message.channel.send(`${client.emotes.success} | Stopped!`);
  },
};

export default command;
