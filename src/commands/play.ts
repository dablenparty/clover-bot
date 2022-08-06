import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import ytsr from "ytsr";
import distubeClient from "../distube";
import { searchYouTubeForVideo, validateURL } from "../util";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "play",
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please provide a link to a song!").setColor("#ff0000")],
      });
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel)
      return message.channel.send({
        embeds: [new EmbedBuilder().setDescription("Please join a voice channel first!").setColor("#ff0000")],
      });
    let playString;
    if (validateURL(query)) {
      playString = query;
    } else {
      const video = await searchYouTubeForVideo(query);
      if (!video) {
        return await message.channel.send({
          embeds: [new EmbedBuilder().setDescription("No result found!").setColor("#ff0000")],
        });
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
