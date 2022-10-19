export default class CommandNotFoundError extends Error {
  constructor(commandName: string) {
    super(`Command '${commandName}' not found`);
  }
}
