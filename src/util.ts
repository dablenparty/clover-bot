import ytsr from "ytsr";

export async function searchYouTubeForVideo(query: string, opts?: ytsr.Options): Promise<ytsr.Video | undefined> {
  const searchResult = await ytsr(query, { safeSearch: false, limit: 5, ...opts });
  const firstVideo = searchResult.items.find((item) => item.type === "video") as ytsr.Video | undefined;
  return firstVideo;
}

export function validateURL(url: string): boolean {
  // This came from copilot. I don't know if it's correct. It works well enough for this.
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  try {
    new URL(url);
    return regex.test(url);
  } catch {
    return false;
  }
}
