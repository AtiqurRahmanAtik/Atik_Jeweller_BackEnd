import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Sub-schema for the "Add New Product" modal
const productItemSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please provide the product name"],
    trim: true, // Prevents accidental leading/trailing spaces
  },
  phone: {
    type: String,
    trim: true,
  },
  metalType: {
    type: String,
    trim: true,
  },
  purity: {
    type: String,
    trim: true,
  },
  weight: {
    type: Number,
    default: 0,
    min: 0, // Prevents negative weight
  },
  quantity: {
    type: Number,
    required: [true, "Please provide the quantity"],
    default: 1,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: [true, "Please provide the unit price"],
    default: 0,
    min: 0,
  },
  totalPrice: {
    type: Number,
    required: [true, "Please provide the total price"],
    default: 0,
    min: 0,
  },
});

const SaleSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, "Please provide the invoice number"],
      unique: true,
      trim: true,
    },
    saleDate: {
      type: Date,
      required: [true, "Please provide the sale date"],
      default: Date.now, // Fallback if frontend fails to send a date
    },
    customer: {
      type: String,
      required: [true, "Please provide the customer"],
      trim: true,
    },
    products: {
      type: [productItemSchema],
      required: [true, "Please provide at least one product"],
    },
    subTotal: {
      type: Number,
      required: [true, "Please provide the sub total"],
      default: 0,
      min: 0,
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: [true, "Please provide the total"],
      default: 0,
    },
    paid: {
      type: Number,
      required: [true, "Please provide the paid amount"],
      default: 0,
      min: 0, // Prevents negative payments
    },
    due: {
      type: Number,
      required: [true, "Please provide the due amount"],
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide the payment method"],
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
      trim: true,
    },
  },
  { timestamps: true } 
);

const Sale = model("Sale", SaleSchema);

export default Sale;