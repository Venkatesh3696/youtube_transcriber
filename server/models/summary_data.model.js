import mongoose from "mongoose";

export const SummaryDataSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
    },
    videoUrl: String,
    transcript: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const SummaryData = mongoose.model("SummaryData", SummaryDataSchema);
