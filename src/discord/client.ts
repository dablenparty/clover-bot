import { Client, GatewayIntentBits } from "discord.js";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

discordClient.on("ready", () => console.log(`${discordClient.user?.tag ?? "Clover"} is ready to play music.`));

export default discordClient;
