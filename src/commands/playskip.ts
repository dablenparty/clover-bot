import { GuildTextBasedChannel } from "discord.js";
import EmptyQueueError from "../@types/errors/EmptyQueue";
import NotInChannelError from "../@types/errors/NotInChannel";
import SongNotFoundError from "../@types/errors/SongNotFound";
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
      throw new EmptyQueueError();
    }
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
      throw new NotInChannelError(message.member?.user?.tag ?? "Unknown user");
    }
    let playString;
    if (validateURL(query)) {
      playString = query;
    } else {
      const video = await searchYouTubeForVideo(query);
      if (!video) {
        throw new SongNotFoundError(query);
      }
      playString = video.url;
    }
    await distubeClient.play(voiceChannel, playString, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
      skip: true,
    });
  },
};

export default command;
