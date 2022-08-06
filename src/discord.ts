import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import config from "../config.json";

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
    console.log(`Command prefix: ${config.prefix}`);
  })
  .on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase() ?? "";
    const cmd =
      discordClient.commands.get(command) || discordClient.commands.get(discordClient.aliases.get(command) ?? "");
    if (!cmd) return;
    // TODO: change error message
    if (cmd.inVoiceChannel && !message.member?.voice.channel) {
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle("You need to be in a voice channel!").setColor("#ff0000")],
      });
      return;
    }
    try {
      await cmd.run(discordClient, message, args);
    } catch (e: any) {
      console.error(e);
      await message.channel.send({
        embeds: [new EmbedBuilder().setTitle("Error").setDescription(`${e}`).setColor("#ff0000")],
      });
    }
  });

discordClient.emotes = config.emoji;

export default discordClient;
