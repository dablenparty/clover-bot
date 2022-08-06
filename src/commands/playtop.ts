import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import distubeClient from "../distube";
import { CloverCommand } from "./commands";

const command: CloverCommand = {
  name: "playtop",
  aliases: ["pt"],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(" ");
    if (!string)
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
    distubeClient.play(voiceChannel, string, {
      member: message.member,
      textChannel: message.channel as GuildTextBasedChannel,
      message,
      position: 1,
    });
  },
};

export default command;
