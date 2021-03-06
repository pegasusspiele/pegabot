/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under GNU Affero General Public License v3.0
 * (see https://github.com/pegabot/discord/blob/main/LICENSE for details)
 */

import express from "express";
import { StatusCodes } from "http-status-codes";
import bot from "../../bot";
import { generateLogKey } from "../../utils/redis";

export const logRouter = express();

logRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  bot.redis.client.get(generateLogKey(id) as string, (error, value) => {
    if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);

    if (!value) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Entry with id: ${id} was not found`,
      });
    }

    return res.status(StatusCodes.OK).json({ message: "Success", data: value });
  });
});
