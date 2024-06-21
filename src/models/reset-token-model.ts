import { Schema, model, models } from "mongoose";

const resetTokenSchema = new Schema({
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

export const ResetTokensModel =
  models.resetTokens || model("resetTokens", resetTokenSchema);
