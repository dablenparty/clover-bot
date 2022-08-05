import { Client, GatewayIntentBits } from "discord.js";
import config from "../../config.json";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

discordClient.on("ready", () => console.log(`${discordClient.user?.tag ?? "Clover"} is ready to play music.`));

discordClient.emotes = config.emoji;

export default discordClient;
