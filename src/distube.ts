// import SoundCloudPlugin from "@distube/soundcloud";
// import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { Colors, EmbedBuilder } from "discord.js";
import DisTube, { Queue } from "distube";
import config from "../config.json";
import discordClient from "./discord";

const embedStatus = (queue: Queue, builder: EmbedBuilder): EmbedBuilder =>
  builder.addFields([
    {
      name: "Volume",
      value: `\`${queue.volume}%\``,
      inline: true,
    },
    {
      name: "Filter",
      value: `\`${queue.filters.names.join(", ") || "Off"}\``,
      inline: true,
    },
    {
      name: "Loop",
      value: `\`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"}\``,
      inline: true,
    },
    {
      name: "Autoplay",
      value: `\`${queue.autoplay ? "On" : "Off"}\``,
      inline: true,
    },
  ]);

const distubeClient = new DisTube(discordClient, {
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    //? maybe later
    // new SpotifyPlugin({
    //   emitEventsAfterFetching: true,
    // }),
    // new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

//! TODO: switch everything to embeds instead of simple messages
distubeClient
  .on(
    "playSong",
    async (queue, song) =>
      await queue.textChannel?.send({
        embeds: [
          embedStatus(queue, new EmbedBuilder())
            .setTitle(`Now Playing: ${song.name ?? "Unknown"}`)
            .setURL(song.url)
            .setImage(song.thumbnail ?? null)
            .setColor("#00ff00"),
        ],
      }),
  )
  .on(
    "addSong",
    async (queue, song) =>
      await queue.textChannel?.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Added ${song.name ?? "Unknown"}`)
            .setURL(song.url)
            .setDescription(song.formattedDuration || "")
            .setColor("#00ff00"),
        ],
      }),
  )
  .on(
    "addList",
    async (queue, playlist) =>
      await queue.textChannel?.send({
        embeds: [
          embedStatus(queue, new EmbedBuilder())
            .setTitle(`Added ${playlist.name} playlist`)
            .setURL(playlist.url ?? null)
            .setDescription(`${playlist.songs.length} songs`)
            .setColor("#00ff00"),
        ],
      }),
  )
  .on("error", async (channel, e) => {
    if (channel)
      await channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${config.emoji.error} | An error encountered`)
            .setDescription(e.toString().slice(0, 1974))
            .setColor(Colors.Red),
        ],
      });
    else console.error(e);
  })
  .on(
    "empty",
    async (queue) =>
      await queue.textChannel?.send({
        embeds: [new EmbedBuilder().setTitle("I don't stay in empty voice channels").setColor(Colors.Red)],
      }),
  )
  .on(
    "searchNoResult",
    async (message, query) =>
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle(`No results for "${query}"!`).setColor(Colors.Red)],
      }),
  )
  .on(
    "finish",
    async (queue) =>
      await queue.textChannel?.send({
        embeds: [new EmbedBuilder().setTitle("Queue finished, leaving...").setColor("#00ff00")],
      }),
  );
export default distubeClient;
