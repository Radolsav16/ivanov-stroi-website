import mongoose from "mongoose";

const contactRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    service: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: ["new", "contacted", "archived"], default: "new" },
  },
  { timestamps: true, versionKey: false },
);

contactRequestSchema.index({ createdAt: -1 });

export const ContactRequest = mongoose.model("ContactRequest", contactRequestSchema);
