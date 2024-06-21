import { Schema, model, models } from "mongoose";

const verificationTokenSchema = new Schema({
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

export const VerificationTokensModel =
  models.verificationTokens ||
  model("verificationTokens", verificationTokenSchema);
