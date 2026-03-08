import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DailyPriceSchema = Schema(
  {
    metalType: {
      type: String,
      required: [true, "Please provide the metal type"],
    },
    purity: {
      type: String,
      required: [true, "Please provide the purity"],
    },
    ratePerVori: {
      type: Number,
      required: [true, "Please provide the rate per vori"],
    },
    makingChargePerVori: {
      type: Number,
      required: [true, "Please provide the making charge per vori"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const DailyPrice = model("DailyPrice", DailyPriceSchema);

export default DailyPrice;