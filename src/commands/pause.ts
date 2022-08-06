import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "pause",
  aliases: ["pause", "hold"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    if (queue.paused) {
      queue.resume();
      return message.channel.send("Resumed the song for you :)");
    }
    queue.pause();
    message.channel.send("Paused the song for you :)");
  },
};

export default command;
