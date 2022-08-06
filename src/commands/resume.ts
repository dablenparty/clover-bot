import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "resume",
  aliases: ["resume", "unpause"],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    if (queue.paused) {
      queue.resume();
      message.channel.send("Resumed the song for you :)");
    } else {
      message.channel.send("The queue is not paused!");
    }
  },
};

export default command;
