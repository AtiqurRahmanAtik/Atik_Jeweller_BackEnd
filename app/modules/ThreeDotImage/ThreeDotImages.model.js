import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ThreeDotImageSchema = Schema(
  {
    imageNumber: {
      type: Number,
      required: [true, "Please provide the image number"],
      unique: true,
    },
    imageName: {
      type: String,
      required: [true, "Please provide the image name"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide the image url"],
    },
    
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const ThreeDotImage = model("ThreeDotImage", ThreeDotImageSchema);

export default ThreeDotImage;