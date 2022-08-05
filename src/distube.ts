// import SoundCloudPlugin from "@distube/soundcloud";
// import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import DisTube, { Queue } from "distube";
import discordClient from "./discord/client";
import config from "../config.json";

const status = (queue: Queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(", ") || "Off"}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

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
    queue.textChannel?.send(
      `${config.emoji.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
        song.user
      }\n${status(queue)}`,
    ),
  )
  .on("addSong", (queue, song) =>
    queue.textChannel?.send(
      `${config.emoji.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ),
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel?.send(
      `${config.emoji.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`,
    ),
  )
  .on("error", (channel, e) => {
    if (channel) channel.send(`${config.emoji.error} | An error encountered: ${e.toString().slice(0, 1974)}`);
    else console.error(e);
  })
  .on("empty", (queue) => queue.textChannel?.send("Voice channel is empty! Leaving the channel..."))
  .on("searchNoResult", (message, query) =>
    message.channel.send(`${config.emoji.error} | No result found for \`${query}\`!`),
  )
  .on("finish", (queue) => queue.textChannel?.send("Finished!"));

export default distubeClient;
