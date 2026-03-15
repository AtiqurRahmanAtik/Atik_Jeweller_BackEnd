import mongoose from "mongoose";

const { Schema, model } = mongoose;

const WebProductSchema = Schema(
  {
    imageName: {
      type: String,
      required: [true, "Please provide the image name"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide the image URL"],
    },
    title: {
      type: String,
      required: [true, "Please provide the title"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Please provide the original price"],
    },
    wages: {
      type: Number,
      required: [true, "Please provide the wages"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Please provide the total price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the quantity"],
    },
    delivery: {
      type: String,
      required: [true, "Please provide the delivery"],
    },
    category: {
      type: String,
      required: [true, "Please provide the category"],
    },
    tag: {
      type: String,
      required: [true, "Please provide the tag"],
    },
    weight: {
      type: String,
      required: [true, "Please provide the weight in Gram"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const WebProduct = model("WebProduct", WebProductSchema);

export default WebProduct;