import mongoose from "mongoose";

const { Schema, model } = mongoose;

const StockSchema = Schema(
  {
    stockType: {
      type: String,
      required: [true, "Please provide the stock type"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Stock = model("Stock", StockSchema);

export default Stock;