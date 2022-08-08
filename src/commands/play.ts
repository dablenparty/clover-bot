import { Colors, EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import distubeClient from "../distube";
import { searchYouTubeForVideo, validateURL } from "../util";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a link to a song!").setColor(Colors.Red)],
      });
      return;
    }
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please join a voice channel first!").setColor(Colors.Red)],
      });
      return;
    }
    let playString;
    if (validateURL(query)) {
      playString = query;
    } else {
      const video = await searchYouTubeForVideo(query);
      if (!video) {
        await message.channel.send({
          embeds: [new EmbedBuilder().setDescription("No result found!").setColor(Colors.Red)],
        });
        return;
      }
      playString = video.url;
    }
    // the type cast should work as this bot should only be used in a guild
    await distubeClient.play(voiceChannel, playString, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
    });
  },
};

export default command;
