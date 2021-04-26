/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import { DMChannel, GuildChannel } from "discord.js";
import { Event } from "../classes/event";
import { ChannelTypes } from "../utils/ChannelTypes";

export class channelDeleteEvent extends Event {
  execute(channel: DMChannel | GuildChannel): void {
    if (typeof channel === typeof DMChannel) return;

    this.bot.logger.admin_red(`:inbox_tray: ${ChannelTypes.get(channel.type)}: \`${(channel as GuildChannel).name}\` **wurde gelöscht**.`);
  }
}
