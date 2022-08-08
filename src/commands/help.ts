import { CloverCommand } from "./commands";
import Discord, { Colors } from "discord.js";

const command: CloverCommand = {
  name: "help",
  aliases: ["h", "cmd", "command"],
  run: async (client, message) => {
    // TODO: add help property to CloverCommand
    await message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle("Commands")
          .setDescription(client.commands.map((cmd) => `\`${cmd.name}\``).join(", "))
          .setColor(Colors.Blurple),
      ],
    });
  },
};

export default command;
