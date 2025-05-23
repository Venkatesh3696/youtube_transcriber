import mongoose from "mongoose";

export const SummaryDataSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true, unique: true },
    transcriptPages: { type: [String], required: true },
    summary: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const SummaryData = mongoose.model("SummaryData", SummaryDataSchema);
