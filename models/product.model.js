import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    user: { type: String, required: true },
    product: { type: String, required: true },
    // enhance code start
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    quality: {
      type: String,
    },
    geolocation: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    pin_code: {
      type: String,
      required: true,
    },
    carbon_footprint: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    // enhance code end
  },
  { timestamps: true }
);
// Add 2dsphere index
productSchema.index({ geolocation: "2dsphere" });
const product = mongoose.model("products", productSchema);
export default product;
