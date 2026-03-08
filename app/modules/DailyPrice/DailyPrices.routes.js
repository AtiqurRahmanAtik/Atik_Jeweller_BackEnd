import { Router } from "express";

import {
  createDailyPrice,
  getAllDailyPrices,
  getDailyPriceById,
  getDailyPricesByBranch,
  updateDailyPrice,
  removeDailyPrice,
} from "./DailyPrices.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js";

const DailyPriceRoutes = Router();

// Protect all routes with authentication middleware
DailyPriceRoutes.get("/",  getAllDailyPrices);
DailyPriceRoutes.get("/:branch/get-all",  getDailyPricesByBranch);
DailyPriceRoutes.get("/get-id/:id",  getDailyPriceById);
DailyPriceRoutes.post("/post",  createDailyPrice);
DailyPriceRoutes.put("/update/:id",  updateDailyPrice);
DailyPriceRoutes.delete("/delete/:id",  removeDailyPrice);

export default DailyPriceRoutes;