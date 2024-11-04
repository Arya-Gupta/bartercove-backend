import mongoose from "mongoose";
import product from "../models/product.model.js";

// Create a product
export const createproduct = async (req, res, next) => {
  try {
    const product = await product.create(req.body);
    return res.status(200).json(product);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// View all products
export const viewproducts = async (req, res, next) => {
  try {
    let products = await product.find();
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      products = products.slice(0, limit);
    }
    return res.status(200).json(products);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// View a product
export const viewproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID format");
      error.status = 400;
      return next(error);
    }

    const myproduct = await product.findById(id);
    if (!myproduct) {
      const error = new Error("product not found");
      error.status = 404;
      return next(error);
    }

    const product = await product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// Update a product
export const updateproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID format");
      error.status = 400;
      return next(error);
    }

    const myproduct = await product.findById(id);
    if (!myproduct) {
      const error = new Error("product not found");
      error.status = 404;
      return next(error);
    }

    await product.findByIdAndUpdate(id, req.body);
    const updatedproduct = await product.findById(id);
    return res.status(200).json(updatedproduct);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// Delete a product
export const deleteproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID format");
      error.status = 400;
      return next(error);
    }

    const myproduct = await product.findById(id);
    if (!myproduct) {
      const error = new Error("product not found");
      error.status = 404;
      return next(error);
    }

    await product.findByIdAndDelete(id);
    return res.status(200).json({ message: "The product has been deleted" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
