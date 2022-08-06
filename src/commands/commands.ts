import Discord from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";

export interface CloverCommand {
  name: string;
  inVoiceChannel?: boolean;
  aliases?: string[];
  run: (client: Discord.Client, message: Discord.Message, args: string[]) => void | Promise<void>;
}

/**
 * Load commands and aliases into the client.
 *
 * @param client The Discord client
 */
export default async function loadCommands(client: Discord.Client<boolean>) {
  const path = __dirname;
  const files = await readdir(path);
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) throw new Error("Could not find any commands!");
  const commands = new Discord.Collection<string, CloverCommand>();
  const aliases = new Discord.Collection<string, string>();
  for (const file of jsFiles) {
    const command: CloverCommand | undefined = (await import(join(path, file)))?.default;
    if (!command) return console.error(`Could not load command ${file}`);
    commands.set(command.name, command);
    if (command.aliases) command.aliases.forEach((alias) => aliases.set(alias, command.name));
  }
  console.log("loaded commands: ", [...commands.keys()]);
  client.commands = commands;
  client.aliases = aliases;
}
