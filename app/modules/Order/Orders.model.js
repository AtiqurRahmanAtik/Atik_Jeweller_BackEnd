import mongoose from "mongoose";

const { Schema, model } = mongoose;

// ── Embedded sub-schema for each cart item ──────────────────
const OrderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "GoldProduct",
    },
    productName: {
      type: String,
      required: [true, "Please provide the product name"],
    },
    category: {
      type: String, // ✅ added category
    },
    salesPrice: {
      type: Number,
      required: [true, "Please provide the sales price"],
    },
    vatPercentage: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the quantity"],
      min: [1, "Quantity must be at least 1"],
    },
    Total: {
      type: Number, // ✅ was lineTotal
    },
    VAT: {
      type: Number, // ✅ was lineVat
    },
    TotalWithVat: {
      type: Number, // ✅ was lineTotalWithVat
    },
  },
  { _id: false }
);

// ── Main Order schema ───────────────────────────────────────
const OrderSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: [true, "Please provide the order ID"],
    },
    Invoice: {
      type: Number,
      required: [true, "Please provide the Invoice ID"],
    },
    customerName: {
      type: String, // ✅ Added customerName
      default: "Walk-in Customer",
    },
    Products: {
      type: [OrderItemSchema],
      required: [true, "Please provide at least one item"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Order must contain at least one item",
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide the price (subtotal)"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    afterDiscount: {
      type: Number,
    },
    totalVat: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: [true, "Please provide the total"],
    },
    paid: {
      type: Number,
      required: [true, "Please provide the paid amount"],
    },
    dueAmount: {
      type: Number,
      required: [true, "Please provide the due amount"],
    },
    expectedDelivery: {
      type: String,
    },
    orderNote: {
      type: String,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;