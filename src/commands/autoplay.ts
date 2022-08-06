import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "autoplay",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = distubeClient.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    const autoplay = queue.toggleAutoplay();
    message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? "On" : "Off"}\``);
  },
};

export default command;
