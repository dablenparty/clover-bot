import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import distubeClient from "../distube";
import { validateURL, searchYouTubeForVideo } from "../util";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "playtop",
  aliases: ["pt"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setDescription("Please provide a link to a song or something to search for!")
            .setColor("#ff0000"),
        ],
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
    distubeClient.play(voiceChannel, playString, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
      position: 1,
    });
  },
};

export default command;
