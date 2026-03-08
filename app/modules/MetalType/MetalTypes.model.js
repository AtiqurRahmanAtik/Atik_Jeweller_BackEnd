import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MetalTypeSchema = Schema(
  {
    metalName: {
      type: String,
      required: [true, "Please provide the metal name"],
    },
   
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const MetalType = model("MetalType", MetalTypeSchema);

export default MetalType;