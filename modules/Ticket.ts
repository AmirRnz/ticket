import mongoose, { Schema, Document } from "mongoose";

interface ITicket extends Document {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
}

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI as string);

mongoose.Promise = global.Promise;

const ticketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: Number, required: true },
    progress: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["not started", "started", "done"],
    },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
// title: { type: String, required: true },
// description: { type: String, required: true },
// category: { type: String, required: true },
// priority: { type: Number, required: true },
// progress: { type: Number, default: 0 },
// status: { type: String, enum: ["Open", "Closed"], default: "Open" },
// active: { type: Boolean, default: true },

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
