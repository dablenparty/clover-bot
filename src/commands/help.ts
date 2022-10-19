import { CloverCommand, COMMAND_PREFIX } from "./commands";
import { Colors, EmbedBuilder } from "discord.js";
import CommandNotFoundError from "../@types/errors/CommandNotFound";
import config from "../../config.json";

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
          new EmbedBuilder()
            .setTitle(`${config.emoji.help} Commands`)
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
        throw new CommandNotFoundError(args[0]);
      }
      const embed = new EmbedBuilder()
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
