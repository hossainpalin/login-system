import { Schema, model, models } from "mongoose";

const twoFactorTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

export const TwoFactorTokensModel =
  models.twoFactorTokens || model("twoFactorTokens", twoFactorTokenSchema);
