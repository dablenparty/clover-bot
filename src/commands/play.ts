import { GuildTextBasedChannel } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import NotInChannelError from "../@types/errors/NotInChannel";
import SongNotFoundError from "../@types/errors/SongNotFound";
import distubeClient from "../distube";
import { searchYouTubeForVideo, validateURL } from "../util";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "play",
  description: "Play a song",
  parameters: [
    {
      name: "song",
      description: "The song to play, either as a URL or a search term",
      type: "string",
    },
  ],
  aliases: ["p"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) {
      throw new BadCommandArgsError("play", "No song provided");
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
    // the type cast should work as this bot should only be used in a guild
    await distubeClient.play(voiceChannel, playString, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
    });
  },
};

export default command;
