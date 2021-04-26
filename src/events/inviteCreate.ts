/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import { Invite } from "discord.js";
import { Event } from "../classes/event";

export class inviteCreateEvent extends Event {
  execute(invite: Invite): void {
    this.bot.logger.admin_green(`:inbox_tray: Die Einladung: ${invite.url} wurde von ${invite.inviter} **erstellt**.`, `Code: ${invite.code}`);
  }
}
