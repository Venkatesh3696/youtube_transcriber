import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("mongo db connected!");
    });
  } catch (error) {
    console.log("Error connecting mongo db: ", error);
    process.exit(1);
  }
};
