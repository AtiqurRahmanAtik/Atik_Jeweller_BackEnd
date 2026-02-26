import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductCategorySchema = Schema(
  {
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

const ProductCategory = model("ProductCategory", ProductCategorySchema);

export default ProductCategory;