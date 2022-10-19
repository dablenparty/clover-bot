import { GuildTextBasedChannel } from "discord.js";
import BadCommandArgsError from "../@types/errors/BadCommandArgs";
import NotInChannelError from "../@types/errors/NotInChannel";
import SongNotFoundError from "../@types/errors/SongNotFound";
import distubeClient from "../distube";
import { validateURL, searchYouTubeForVideo } from "../util";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "playtop",
  description: "Add a song to the top of the queue",
  parameters: [
    {
      name: "song",
      description: "The song to play, either as a URL or a search term",
      type: "string",
    },
  ],
  aliases: ["pt"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) {
      throw new BadCommandArgsError("playtop", "No song provided");
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
      position: 1,
    });
  },
};

export default command;
