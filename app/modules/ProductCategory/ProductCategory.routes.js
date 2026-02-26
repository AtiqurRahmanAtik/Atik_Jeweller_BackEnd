import { Router } from "express";

import {
  createProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  getProductCategoriesByBranch,
  updateProductCategory,
  removeProductCategory,
} from "./ProductCategory.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const ProductCategoryRoutes = Router();

// Protect all routes with authentication middleware
ProductCategoryRoutes.get("/", authenticateToken, getAllProductCategories);
ProductCategoryRoutes.get("/:branch/get-all", authenticateToken, getProductCategoriesByBranch);
ProductCategoryRoutes.get("/get-id/:id", authenticateToken, getProductCategoryById);
ProductCategoryRoutes.post("/post", authenticateToken, createProductCategory);
ProductCategoryRoutes.put("/update/:id", authenticateToken, updateProductCategory);
ProductCategoryRoutes.delete("/delete/:id", authenticateToken, removeProductCategory);

export default ProductCategoryRoutes;