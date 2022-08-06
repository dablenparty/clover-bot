import { Collection } from "discord.js";
import { CloverCommand } from "../../commands/commands";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, CloverCommand>;
    aliases: Collection<string, string>;
    emotes: { [key: string]: string };
  }
}
