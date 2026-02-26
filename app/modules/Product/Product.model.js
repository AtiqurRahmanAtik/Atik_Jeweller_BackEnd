import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title"],
    },
    mainImage: {
      type: String,
      required: [true, "Please provide the main image"],
    },
    subImage: {
      type: [String],
      default: [],
    },
    mainPrice: {
      type: Number,
      required: [true, "Please provide the main price"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide the stock number"],
    },
    category: {
      type: String,
      required: [true, "Please provide the category"],
      

    },
    tag: {
      type: [String],
      default: [],
    },
    estimateDelivery: {
      type: String,
      required: [true, "Please provide the estimate delivery"],
    },
    additionalInfo: {
      type: String,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);

export default Product;