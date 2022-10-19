export default class SongNotFoundError extends Error {
  constructor(query: string) {
    super(`Song not found for '${query}'`);
  }
}
