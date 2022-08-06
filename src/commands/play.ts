import { GuildTextBasedChannel } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    // TODO: switch to embeds
    if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`);
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`);
    // the type cast should work as this bot should only be used in a guild
    distubeClient.play(voiceChannel, string, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
    });
  },
};

export default command;
