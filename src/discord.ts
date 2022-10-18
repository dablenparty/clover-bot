import { Client, Colors, EmbedBuilder, GatewayIntentBits } from "discord.js";
import config from "../config.json";
import BadCommandArgsError from "./@types/errors/BadCommandArgs";
import { COMMAND_PREFIX } from "./commands/commands";
import helpCommand from "./commands/help";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

discordClient
  .on("ready", () => {
    console.log(`${discordClient.user?.tag ?? "Clover"} is ready to play music.`);
    console.log(`${discordClient.guilds.cache.size} guilds are connected.`);
    console.log(`Command prefix: ${COMMAND_PREFIX}`);
  })
  .on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    const prefix = COMMAND_PREFIX;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase() ?? "";
    const cmd =
      discordClient.commands.get(command) || discordClient.commands.get(discordClient.aliases.get(command) ?? "");
    if (!cmd) return;
    if (cmd.inVoiceChannel && !message.member?.voice.channel) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle("You need to be in a voice channel!").setColor(Colors.Red)],
      });
      return;
    }
    try {
      await cmd.run(discordClient, message, args);
    } catch (e: any) {
      let description = e instanceof Error ? e.message : `${e}`;
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle(`Error`).setDescription(description).setColor(Colors.Red)],
      });
      if (e instanceof BadCommandArgsError) {
        helpCommand.run(discordClient, message, [cmd.name]);
      }
    }
  });

discordClient.emotes = config.emoji;

export default discordClient;
