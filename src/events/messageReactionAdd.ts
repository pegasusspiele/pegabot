/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import { MessageReaction, User } from "discord.js";
import { Event } from "../classes/event";
import { reactions } from "../constants/reactions";
import { RollsModel } from "../models/rolls";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";
import { generateEmbed, generateParams, rollDice } from "../utils/RollButler";

const { MessageAttachment } = require("discord.js");

export class messageReactionAddEvent extends Event {
  async execute(reaction: MessageReaction, user: User): Promise<void> {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        return;
      }
    }

    if (user.bot) return;

    if (
      !Object.entries(reactions)
        .map((elt) => elt[1])
        .includes(reaction.emoji.name)
    )
      return;

    const {
      message: { id: messageId },
    } = reaction;

    RollsModel.find({ messageId: messageId }, async (error, data) => {
      if (data.length < 1) return;

      const { dice } = data[0];

      const params = generateParams(this.bot, user, dice);

      let response: any = await rollDice(this.bot, params);

      try {
        response = JSON.parse(response);
      } catch {
        return;
      }

      let replied;
      if (response?.image) {
        const result: any = await fetchWithTimeout(`https:${response.image}?${new Date().getTime()}`);
        const buffer = await result.buffer();
        replied = await reaction.message.channel.send(response.message, new MessageAttachment(buffer));
      } else {
        const embed = generateEmbed(this.bot, dice, user, response);
        replied = await reaction.message.channel.send(embed);
      }

      replied.react(reactions.rollReaction);

      const entry = new RollsModel();
      entry.messageId = replied.id;
      entry.dice = dice;
      entry.save();
    });
  }
}
