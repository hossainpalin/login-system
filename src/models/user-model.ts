import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    agreement: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true },
);

export const UsersModel = models.users || model("users", userSchema);
