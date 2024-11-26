import express from "express";
import {
  // enhance code start
  uploadProductPhoto,
  resizeProductPhoto,
  // enhance code end
  createproduct,
  viewproducts,
  viewproduct,
  updateproduct,
  deleteproduct,
} from "../controllers/product.controller.js";
const router = express.Router();

// Create a product
router.post("/", uploadProductPhoto, resizeProductPhoto, createproduct);

// View all products
router.get("/", viewproducts);

// View a product
router.get("/:id", viewproduct);

// Update a product
router.patch("/:id", uploadProductPhoto, resizeProductPhoto, updateproduct);

// Delete a product
router.delete("/:id", deleteproduct);

export default router;
