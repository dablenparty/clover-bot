export default class BadCommandArgsError extends Error {
  constructor(commandName: string, reason: string) {
    // TODO: show the command usage
    super(`Bad arguments for command '${commandName}': ${reason}`);
  }
}
