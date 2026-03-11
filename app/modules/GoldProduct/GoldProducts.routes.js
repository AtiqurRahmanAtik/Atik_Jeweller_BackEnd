import { Router } from "express";
import {
  createGoldProduct,
  getAllGoldProducts,
  getGoldProductById,
  getGoldProductsByBranch,
  updateGoldProduct,
  removeGoldProduct,
} from "./GoldProducts.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const GoldProductRoutes = Router();

// Protect all routes with authentication middleware
GoldProductRoutes.get("/",  getAllGoldProducts);
GoldProductRoutes.get("/:branch/get-all", getGoldProductsByBranch);
GoldProductRoutes.get("/get-id/:id",  getGoldProductById);
GoldProductRoutes.post("/post",  createGoldProduct);
GoldProductRoutes.put("/update/:id",  updateGoldProduct);
GoldProductRoutes.delete("/delete/:id",  removeGoldProduct);

export default GoldProductRoutes;