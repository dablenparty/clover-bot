// import SoundCloudPlugin from "@distube/soundcloud";
// import SpotifyPlugin from "@distube/spotify";
import { YtDlpPlugin } from "@distube/yt-dlp";
import DisTube from "distube";
import discordClient from "./discord/client";

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

export default distubeClient
