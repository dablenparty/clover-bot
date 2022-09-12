// import SoundCloudPlugin from "@distube/soundcloud";
// import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { Colors, EmbedBuilder } from "discord.js";
import DisTube, { Queue } from "distube";
import formatDuration from "format-duration";
import config from "../config.json";
import discordClient from "./discord";

const embedStatus = (queue: Queue, builder: EmbedBuilder): EmbedBuilder =>
  builder.addFields([
    {
      name: "Queued by",
      value: `\`${queue.songs[0].user?.tag ?? "Unknown"}\``,
      inline: true,
    },
    {
      name: "Duration",
      value: `\`${queue.songs[0].formattedDuration || formatDuration(queue.songs[0].duration * 1000)}\``,
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

distubeClient
  .on("playSong", async (queue, song) =>
    queue.textChannel?.send({
      embeds: [
        embedStatus(queue, new EmbedBuilder())
          .setTitle(`Now Playing: ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setImage(song.thumbnail ?? null)
          .setColor(Colors.Green),
      ],
    }),
  )
  .on("addSong", async (queue, song) =>
    queue.textChannel?.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Added ${song.name ?? "Unknown"}`)
          .setURL(song.url)
          .setDescription(`\`${song.formattedDuration || formatDuration(song.duration * 1000)}\``)
          .setImage(song.thumbnail ?? null)
          .setColor(Colors.Green),
      ],
    }),
  )
  .on("addList", async (queue, playlist) =>
    queue.textChannel?.send({
      embeds: [
        embedStatus(queue, new EmbedBuilder())
          .setTitle(`Added ${playlist.name} playlist`)
          .setURL(playlist.url ?? null)
          .setDescription(`${playlist.songs.length} songs`)
          .setColor(Colors.Green),
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
  .on("empty", async (queue) =>
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setTitle("I don't stay in empty voice channels").setColor(Colors.Red)],
    }),
  )
  .on("searchNoResult", async (message, query) =>
    message.channel.send({
      embeds: [new EmbedBuilder().setTitle(`No results for "${query}"!`).setColor(Colors.Red)],
    }),
  )
  .on("finish", async (queue) =>
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setTitle("Queue finished, leaving...").setColor(Colors.Green)],
    }),
  );
export default distubeClient;
