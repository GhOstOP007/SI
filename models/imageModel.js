import mongoose from "mongoose";

//Define imageScheme

const imageScheme = new mongoose.Schema(
  {
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ImageS", imageScheme);
