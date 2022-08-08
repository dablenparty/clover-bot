import Discord from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";

// TODO: parameter validation
export interface CloverParameter {
  name: string;
  description: string;
  type: "string" | "number" | "boolean" | "user" | "channel" | "role" | "emoji" | "message" | "command";
  optional?: boolean;
}

export interface CloverCommand {
  name: string;
  description: string;
  parameters?: CloverParameter[];
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
    if (!command) {
      console.error(`Could not load command ${file}`);
      continue;
    }
    if (commands.has(command.name)) {
      //! do not launch the bot if there are duplicate commands
      throw new Error(`ERROR: ${file} has the same command name as ${commands.get(command.name)?.name}`)
    }
    commands.set(command.name, command);
    if (command.aliases)
      command.aliases.forEach((alias) => {
        if (aliases.has(alias)) console.warn(`WARNING: ${alias} is already an alias for ${aliases.get(alias)}`);
        else aliases.set(alias, command.name);
      });
  }
  console.log("loaded commands: ", [...commands.keys()]);
  client.commands = commands;
  client.aliases = aliases;
}
