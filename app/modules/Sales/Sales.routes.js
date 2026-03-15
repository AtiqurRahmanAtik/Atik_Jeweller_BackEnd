import { Router } from "express";

import {
  createSale,
  getAllSales,
  getSaleById,
  getSalesByBranch,
  updateSale,
  removeSale,
} from "./Sales.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const SaleRoutes = Router();

// Protect all routes with authentication middleware
SaleRoutes.get("/",  getAllSales);
SaleRoutes.get("/:branch/get-all",  getSalesByBranch);
SaleRoutes.get("/get-id/:id",  getSaleById);
SaleRoutes.post("/post",  createSale);
SaleRoutes.put("/update/:id",  updateSale);
SaleRoutes.delete("/delete/:id",  removeSale);

export default SaleRoutes;