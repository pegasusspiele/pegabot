/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import { APIMessage } from "discord-api-types/payloads/v8/channel";
import { ApplicationCommandOptionData, CommandInteraction, CommandInteractionOption, Message, PermissionString } from "discord.js";
import { Bot } from "../bot";

export enum InteractionCommandErrors {
  INTERNAL_ERROR = "Ein Fehler ist aufgetreten, bitte versuche es später erneut!",
  INVALID_OPTIONS = "Deine Eingabe scheint fehlerhaft, bitte überprüfe diese noch Einmal!",
  MISSING_PERMISSIONS = "Für diese Interaction fehlen dir leider die nötigen Rechte!",
}

export interface InteractionSubcommand {
  name: string;
  execute: (interaction: CommandInteraction, options?: CommandInteractionOption[]) => Promise<void | Message | APIMessage> | void;
}

export abstract class InteractionCommand {
  bot: Bot;
  id?: string;

  abstract name: string;
  abstract description: string;

  developmentOnly = false;

  options: ApplicationCommandOptionData[] = [];

  subcommands: InteractionSubcommand[] = [];

  permissions: PermissionString[] = [];
  roles: String[] = [];

  constructor(bot: Bot) {
    this.bot = bot;
  }

  error(interaction: CommandInteraction, errorType: InteractionCommandErrors | string): void {
    interaction.reply(errorType, { ephemeral: true });
  }

  deferedError(interaction: CommandInteraction, errorType: InteractionCommandErrors | string): void {
    interaction.editReply(errorType);
  }

  abstract execute(interaction: CommandInteraction, options?: CommandInteractionOption[]): Promise<void | Message | APIMessage> | void;
}
