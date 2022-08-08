import { Colors, EmbedBuilder, GuildTextBasedChannel } from "discord.js";
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
      await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setDescription("Please provide a link to a song or something to search for!")
            .setColor(Colors.Red),
        ],
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
    await distubeClient.play(voiceChannel, playString, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
      position: 1,
    });
  },
};

export default command;
