import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CartItemSchema = Schema(
  {
    productImage: {
      type: String,
    },
    productName: {
      type: String,
    },
    category: {
      type: String,
    },
    metalType: {
      type: String,
    },
    purity: {
      type: String,
    },
    weightInGrams: {
      type: Number,
    },
    purchasePrice: {
      type: Number,
    },
    salesPrice: {
      type: Number,
    },
    vatPercentage: {
      type: Number,
    },
  },
  { _id: false }
);

const PosSaleSchema = Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, "Please provide the invoice number"],
      unique: true,
    },
    saleDate: {
      type: Date,
      required: [true, "Please provide the sale date"],
    },
    customer: {
      type: String,
    },
    subTotal: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    total: {
      type: Number,
    },
    payments: {
      type: Number,
    },
    dueAmount: {
      type: Number,
    },
    totalPaid: {
      type: Number,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
    cartItems: [CartItemSchema],
  },
  { timestamps: true }
);

const PosSale = model("PosSale", PosSaleSchema);

export default PosSale;