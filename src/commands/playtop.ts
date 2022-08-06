import { GuildTextBasedChannel } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "playtop",
  aliases: ["pt"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`);
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`);
    distubeClient.play(voiceChannel, string, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
      position: 1,
    });
  },
};

export default command;
