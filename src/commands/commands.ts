import Discord from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";

export interface CloverCommand {
  name: string;
  inVoiceChannel?: boolean;
  aliases?: string[];
  run: (client: Discord.Client, message: Discord.Message, args: string[]) => void;
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
  const aliases = new Discord.Collection<string, CloverCommand>();
  jsFiles.forEach((file) => {
    const command: CloverCommand = require(join(path, file));
    console.log(`Loaded ${file}`);
    commands.set(command.name, command);
    if (command.aliases) command.aliases.forEach((alias) => aliases.set(alias, command));
  });
  client.commands = commands;
  client.aliases = aliases;
}
