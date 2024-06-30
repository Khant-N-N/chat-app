import { InferSchemaType, Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: { type: String, required: true },
    messages: {
      type: [
        {
          senderId: String,
          text: String,
          sendAt: Date,
        },
      ],
    },
  },
  { timestamps: true }
);

type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>("message", messageSchema);
