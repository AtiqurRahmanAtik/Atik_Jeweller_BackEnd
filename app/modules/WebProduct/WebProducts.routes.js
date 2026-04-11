import { Router } from "express";

import {
  createWebProduct,
  getAllWebProducts,
  getWebProductById,
  getWebProductsByBranch,
  updateWebProduct,
  removeWebProduct,
  searchWebProducts,
} from "./WebProducts.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const WebProductRoutes = Router();

// Protect all routes with authentication middleware
WebProductRoutes.get("/",  getAllWebProducts);
// ⚠️ MUST BE BEFORE ANY `/:param` ROUTES ⚠️
WebProductRoutes.get("/search", searchWebProducts);
WebProductRoutes.get("/:branch/get-all",  getWebProductsByBranch);
WebProductRoutes.get("/get-id/:id",  getWebProductById);
WebProductRoutes.post("/post",  createWebProduct);
WebProductRoutes.put("/update/:id",  updateWebProduct);
WebProductRoutes.delete("/delete/:id",  removeWebProduct);

export default WebProductRoutes;