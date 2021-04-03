/*
 * Copyright (c) 2020 - 2021 The Pegabot authors
 * This code is licensed under MIT license (see LICENSE for details)
 */

import { Document, model as setModel, Schema } from "mongoose";
import * as path from "path";

export interface IuserGivenRoles extends Document {
  expires: number;
  userId: string;
  roleId: string;
}

const userGivenRolesSchema = new Schema({
  expires: { type: Number },
  userId: String,
  roleId: String,
});

export const userGivenRolesModel = setModel<IuserGivenRoles>(path.basename(__filename).split(".js")[0], userGivenRolesSchema);
