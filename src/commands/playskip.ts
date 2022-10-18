import { Colors, EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import { DisTubeError } from "distube";
import distubeClient from "../distube";
import { validateURL, searchYouTubeForVideo } from "../util";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "playskip",
  description: "Play a song and skip the currently playing song",
  parameters: [
    {
      name: "song",
      description: "The song to play, either as a URL or a search term",
      type: "string",
    },
  ],
  aliases: ["ps"],
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
    try {
      await distubeClient.play(voiceChannel, playString, {
        member: message.member,
        textChannel: message.channel as GuildTextBasedChannel,
        message,
        skip: true,
      });
    } catch (e: any) {
      if (e instanceof DisTubeError && e.code === "NO_UP_NEXT") {
        await message.channel.send({
          embeds: [new EmbedBuilder().setDescription("No next song!").setColor(Colors.Red)],
        });
      } else {
        throw e;
      }
    }
  },
};

export default command;
