export default class NotInChannelError extends Error {
  constructor(userName: string) {
    super(`\`${userName}\` is not in a voice channel`);
  }
}
