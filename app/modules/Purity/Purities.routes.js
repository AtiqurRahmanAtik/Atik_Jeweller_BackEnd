import { Router } from "express";
import {
  createPurity,
  getAllPurities,
  getPurityById,
  getPuritiesByBranch,
  updatePurity,
  removePurity,
} from "./Purities.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const PurityRoutes = Router();

// Protect all routes with authentication middleware
PurityRoutes.get("/",  getAllPurities);
PurityRoutes.get("/:branch/get-all", getPuritiesByBranch);
PurityRoutes.get("/get-id/:id",  getPurityById);
PurityRoutes.post("/post",  createPurity);
PurityRoutes.put("/update/:id",  updatePurity);
PurityRoutes.delete("/delete/:id",  removePurity);

export default PurityRoutes;