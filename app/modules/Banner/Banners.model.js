// app/modules/Banner/Banners.model.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BannerSchema = Schema(
  {
    bannerName: {
      type: String,
      required: [true, "Please provide the banner name"],
    },
    bannerUrl: {
      type: String,
      required: [true, "Please provide the banner URL"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Banner = model("Banner", BannerSchema);

export default Banner;