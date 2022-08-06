// import SoundCloudPlugin from "@distube/soundcloud";
// import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { EmbedBuilder } from "discord.js";
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
  .on("playSong", (queue, song) =>
    queue.textChannel?.send({
      embeds: [
        embedStatus(queue, new EmbedBuilder())
          .setTitle(`Now Playing ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setImage(song.thumbnail ?? null)
          .setColor("#00ff00"),
      ],
    }),
  )
  .on("addSong", (queue, song) =>
    queue.textChannel?.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Added ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setDescription(song.formattedDuration || "")
          .setColor("#00ff00"),
      ],
    }),
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel?.send({
      embeds: [
        embedStatus(queue, new EmbedBuilder())
          .setTitle(`Added ${playlist.name} playlist`)
          .setURL(playlist.url ?? null)
          .setDescription(`${playlist.songs.length} songs`)
          .setColor("#00ff00"),
      ],
    }),
  )
  .on("error", (channel, e) => {
    if (channel)
      channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${config.emoji.error} | An error encountered`)
            .setDescription(e.toString().slice(0, 1974))
            .setColor("#ff0000"),
        ],
      });
    else console.error(e);
  })
  .on("empty", (queue) => queue.textChannel?.send("Voice channel is empty! Leaving the channel..."))
  .on("searchNoResult", (message, query) =>
    message.channel.send(`${config.emoji.error} | No result found for \`${query}\`!`),
  )
  .on("finish", (queue) => queue.textChannel?.send("Finished!"));

export default distubeClient;
