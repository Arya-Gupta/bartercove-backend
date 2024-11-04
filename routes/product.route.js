import express from "express";
import {
  createproduct,
  viewproducts,
  viewproduct,
  updateproduct,
  deleteproduct,
} from "../controllers/product.controller.js";
const router = express.Router();

// Create a product
router.post("/", createproduct);

// View all products
router.get("/", viewproducts);

// View a product
router.get("/:id", viewproduct);

// Update a product
router.put("/:id", updateproduct);

// Delete a product
router.delete("/:id", deleteproduct);

export default router;
