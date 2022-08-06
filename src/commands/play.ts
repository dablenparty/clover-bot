import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a link to a song!").setColor("#ff0000")],
      });
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please join a voice channel first!").setColor("#ff0000")],
      });
    // the type cast should work as this bot should only be used in a guild
    distubeClient.play(voiceChannel, string, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
    });
  },
};

export default command;
