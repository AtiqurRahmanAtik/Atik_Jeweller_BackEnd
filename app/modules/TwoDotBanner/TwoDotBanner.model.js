import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TwoDotBannerSchema = Schema(
  {
    imageName: {
      type: String,
      required: [true, "Please provide the image name"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide the image URL"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const TwoDotBanner = model("TwoDotBanner", TwoDotBannerSchema);

export default TwoDotBanner;