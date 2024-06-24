import { Schema, model, models } from "mongoose";

const twoFactorConfirmationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const TwoFactorConfirmationModel =
  models.twoFactorConfirmation ||
  model("twoFactorConfirmation", twoFactorConfirmationSchema);
