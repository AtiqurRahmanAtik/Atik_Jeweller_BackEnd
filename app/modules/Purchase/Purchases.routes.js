import { Router } from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  getPurchasesByBranch,
  updatePurchase,
  addProductToPurchase,
  removePurchase,
} from "./Purchases.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const PurchaseRoutes = Router();


// Protect all routes with authentication middleware
PurchaseRoutes.get("/",  getAllPurchases);
PurchaseRoutes.get("/:branch/get-all",  getPurchasesByBranch);
PurchaseRoutes.get("/get-id/:id",  getPurchaseById);
PurchaseRoutes.post("/post", createPurchase);
PurchaseRoutes.put("/update/:id",  updatePurchase);
PurchaseRoutes.post("/add-product/:id",  addProductToPurchase);
PurchaseRoutes.delete("/delete/:id", removePurchase);

export default PurchaseRoutes;