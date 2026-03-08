import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PuritySchema = Schema(
  {
    purityName: {
      type: String,
      required: [true, "Please provide the purity name"],
    },
   
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Purity = model("Purity", PuritySchema);

export default Purity;