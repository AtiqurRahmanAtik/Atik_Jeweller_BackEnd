import mongoose from "mongoose";

const { Schema, model } = mongoose;


const GoldProductSchema = Schema(
  {
    productImage: {
      type: String,
      required: [true, "Please provide the product image"],
    },
    productName: {
      type: String,
      required: [true, "Please provide the product name"],
    },
    category: {
      type: String,
      required: [true, "Please provide the category"],
    },
    stockTypes: {
      type: String,
      required: [true, "Please provide the stock types"],
    },
    metalType: {
      type: String,
      required: [true, "Please provide the metal type"],
    },
    purity: {
      type: String,
      required: [true, "Please provide the purity"],
    },
    weightInGrams: {
      type: Number,
      required: [true, "Please provide the weight in grams"],
    },
    vori: {
      type: Number,
      required: [true, "Please provide the vori"],
    },
    ana: {
      type: Number,
      required: [true, "Please provide the ana"],
    },
    roti: {
      type: Number,
      required: [true, "Please provide the roti"],
    },
    point: {
      type: Number,
      required: [true, "Please provide the point"],
    },
    purchaseRatePerVori: {
      type: Number,
      required: [true, "Please provide the purchase rate per vori"],
    },
    purchasePrice: {
      type: Number,
      required: [true, "Please provide the purchase price"],
    },
    salesRatePerVori: {
      type: Number,
      required: [true, "Please provide the sales rate per vori"],
    },
    salesPrice: {
      type: Number,
      required: [true, "Please provide the sales price"],
    },
    makingCharge: {
      type: Number,
      required: [true, "Please provide the making charge"],
    },
    vatPercentage: {
      type: Number,
      required: [true, "Please provide the vat percentage"],
    },
    productDescription: {
      type: String,
      required: [true, "Please provide the product description"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const GoldProduct = model("GoldProduct", GoldProductSchema);

export default GoldProduct;