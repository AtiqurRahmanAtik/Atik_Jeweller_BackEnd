import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BannerSchema = Schema(
  {
    bannerNumber: {
      type: Number,
      required: [true, "Please provide the banner number"],
      unique: true,
    },
    bannerName: {
      type: String,
      required: [true, "Please provide the banner name"],
    },
    bannerUrl: {
      type: String,
      required: [true, "Please provide the banner url"],
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