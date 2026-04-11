import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AddProductSchema = Schema({
  productName: {
    type: String,
    required: [true, "Please provide the product name"],
  },
  phone: {
    type: String,
  },
  metalType: {
    type: String,
  },
  purity: {
    type: String,
  },
  weight: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, "Please provide the quantity"],
    default: 1,
  },
  unitPrice: {
    type: Number,
    required: [true, "Please provide the unit price"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please provide the total price for this item"],
  },
});



const PurchaseSchema = Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, "Please provide the invoice number"],
      unique: true,
    },
    purchaseDate: {
      type: Date,
      required: [true, "Please provide the purchase date"],
    },
    supplier: {
      type: String,
      required: [true, "Please provide the supplier"],
    },
    products: [AddProductSchema],
    subTotal: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    
    totalAmount: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Number,
      default: 0,
    },
    due: {
      type: Number,
      default: 0,
    },
    paymentMethod:{
        type : Number,
        required : [true, "Please provide the paymentMethod"],
    },
    note: {
      type: String,
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Purchase = model("Purchase", PurchaseSchema);

export default Purchase;
