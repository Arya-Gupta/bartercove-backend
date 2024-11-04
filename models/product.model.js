import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    user: { type: String, required: true },
    product: { type: String, required: true },
  },
  { timestamps: true }
);

const product = mongoose.model("product", productSchema);
export default product;
