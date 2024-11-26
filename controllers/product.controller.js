import mongoose from "mongoose";
import Product from "../models/product.model.js";

// enhance code start
import fs from "fs";
import multer from "multer";
import sharp from "sharp";
import path from "path";
// enhance code end

// enhance code start

// update product image implementation code start

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    const error = new Error("Not an image! Please upload only images.");
    error.statusCode = 400;
    cb(error, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB size limit
});

export const uploadProductPhoto = upload.single("image");
export const resizeProductPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next(); // No file uploaded, proceed to next middleware
    const filename = `product-${Math.random()}-${Date.now()}.jpeg`;

    // Resize and convert image to buffer
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/image/product/${filename}`);

    // check if product exists in the database
    const product_info = await Product.findById(req.params.id);

    if (!product_info) {
      const error = new Error("No product found with that ID");
      error.statusCode = 404;
      return next(error);
    }

    // Delete the previous image if it exists
    if (product_info.image) {
      const previousImagePath = path.join(
        "public/image/product",
        product_info.image
      );
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath); // Delete the file
      }
    }

    req.file.filename = filename;
    return next();
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
// update product image implementation code end
// enhance code end

// Create a product
export const createproduct = async (req, res, next) => {
  try {
    if (req?.file?.filename) {
      req.body.image = req.file.filename;
    }
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// View all products

// enhance code start
export const viewproducts = async (req, res, next) => {
  try {
    const { longitude, latitude, maxDistance = 1000 } = req.query; // maxDistance in meters
    let products;
    if (!longitude || !latitude) {
      products = await Product.find();
    } else {
      products = await Product.find({
        geolocation: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)], // longitude, latitude
            },
            $maxDistance: parseFloat(maxDistance), // Search radius in meters
          },
        },
      });
    }

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
// enhance code end

// export const viewproducts = async (req, res, next) => {
//   try {
//     let products = await Product.find();
//     const limit = parseInt(req.query.limit);
//     if (!isNaN(limit) && limit > 0) {
//       products = products.slice(0, limit);
//     }
//     return res.status(200).json(products);
//   } catch (err) {
//     const error = new Error(err);
//     return next(error);
//   }
// };

// View a product
export const viewproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID format");
      error.status = 400;
      return next(error);
    }

    const myproduct = await Product.findById(id);
    if (!myproduct) {
      const error = new Error("product not found");
      error.status = 404;
      return next(error);
    }

    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

// enhance code start
export const updateproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID format");
      error.status = 400;
      return next(error);
    }

    const myproduct = await Product.findById(id);
    if (!myproduct) {
      const error = new Error("product not found");
      error.status = 404;
      return next(error);
    }
    if (req?.file?.filename) {
      req.body.image = req.file.filename;
    }

    await Product.findByIdAndUpdate(id, req.body);
    const updatedproduct = await Product.findById(id);
    return res.status(200).json(updatedproduct);
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
// enhance code end

// Update a product
// export const updateproduct = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       const error = new Error("Invalid product ID format");
//       error.status = 400;
//       return next(error);
//     }

//     const myproduct = await product.findById(id);
//     if (!myproduct) {
//       const error = new Error("product not found");
//       error.status = 404;
//       return next(error);
//     }

//     await product.findByIdAndUpdate(id, req.body);
//     const updatedproduct = await product.findById(id);
//     return res.status(200).json(updatedproduct);
//   } catch (err) {
//     const error = new Error(err);
//     return next(error);
//   }
// };

// Delete a product
export const deleteproduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid product ID format");
      error.status = 400;
      return next(error);
    }

    const myproduct = await Product.findById(id);
    if (!myproduct) {
      const error = new Error("product not found");
      error.status = 404;
      return next(error);
    }

    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "The product has been deleted" });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
