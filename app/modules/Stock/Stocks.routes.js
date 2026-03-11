import { Router } from "express";
import {
  createStock,
  getAllStocks,
  getStockById,
  getStocksByBranch,
  updateStock,
  removeStock,
} from "./Stocks.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const StockRoutes = Router();

// Protect all routes with authentication middleware
StockRoutes.get("/",  getAllStocks);
StockRoutes.get("/:branch/get-all", getStocksByBranch);
StockRoutes.get("/get-id/:id",  getStockById);
StockRoutes.post("/post",  createStock);
StockRoutes.put("/update/:id",  updateStock);
StockRoutes.delete("/delete/:id",  removeStock);

export default StockRoutes;