import { Router } from "express";
import {
  createPosSale,
  getAllPosSales,
  getPosSaleById,
  getPosSalesByBranch,
  updatePosSale,
  removePosSale,
} from "./PosSales.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const PosSaleRoutes = Router();

// Protect all routes with authentication middleware
PosSaleRoutes.get("/",  getAllPosSales);
PosSaleRoutes.get("/:branch/get-all", getPosSalesByBranch);
PosSaleRoutes.get("/get-id/:id",  getPosSaleById);
PosSaleRoutes.post("/post",  createPosSale);
PosSaleRoutes.put("/update/:id",  updatePosSale);
PosSaleRoutes.delete("/delete/:id",  removePosSale);

export default PosSaleRoutes;