import { CloverCommand, COMMAND_PREFIX } from "./commands";
import Discord, { Colors } from "discord.js";

const command: CloverCommand = {
  name: "help",
  description: "Shows this help menu",
  parameters: [
    {
      name: "command",
      description: "The command to show help for",
      type: "string",
      optional: true,
    },
  ],
  aliases: ["h", "cmd", "command"],
  run: async (client, message, args) => {
    if (!args[0]) {
      await message.channel.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("Commands")
            .setDescription(
              `Use ${COMMAND_PREFIX}help [command] for help with a specific command\n\n${client.commands
                .map((cmd) => `\`${cmd.name}\``)
                .join(", ")}`,
            )
            .setColor(Colors.Blurple),
        ],
      });
    } else {
      const command = client.commands.get(args[0]);
      if (!command) {
        await message.channel.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Command not found")
              .setDescription(`Command \`${args[0]}\` not found`)
              .setColor(Colors.Red),
          ],
        });
        return;
      }
      const embed = new Discord.EmbedBuilder()
        .setTitle(`Help: ${command.name}`)
        .setDescription(command.description)
        .setColor(Colors.Blurple);
      if (command.aliases) {
        embed.setDescription(
          `${command.description}\n\nAliases: ${command.aliases.map((a) => `\`${a}\``).join(", ")}\n\nParameters:`,
        );
      }
      if (command.parameters) {
        embed.addFields(
          command.parameters.map((param) => {
            return {
              name: `${param.name}: ${param.optional ? "optional " : ""}${param.type}`,
              value: param.description,
            };
          }),
        );
      }
      await message.channel.send({ embeds: [embed] });
    }
  },
};

export default command;
