import { InferSchemaType, Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    members: { type: [String], required: true },
    chatname: { type: String, default: "" },
  },
  { timestamps: true }
);

type Chat = InferSchemaType<typeof chatSchema>;

export default model<Chat>("chat", chatSchema);
