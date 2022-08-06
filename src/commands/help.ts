import { CloverCommand } from "./commands";
import Discord from "discord.js";

const command: CloverCommand = {
  name: "help",
  aliases: ["h", "cmd", "command"],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle("Commands")
          .setDescription(client.commands.map((cmd) => `\`${cmd.name}\``).join(", "))
          .setColor("#5865F2"),
      ],
    });
  },
};

export default command;
