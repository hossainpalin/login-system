import { Schema, model, models } from "mongoose";

const twoFactorTempUserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const TwoFactorTempUserModel =
  models.twoFactorTempUser ||
  model("twoFactorTempUser", twoFactorTempUserSchema);
