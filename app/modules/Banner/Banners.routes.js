import { Router } from "express";

import {
  createBanner,
  getAllBanners,
  getBannerById,
  getBannersByBranch,
  updateBanner,
  removeBanner,
} from "./Banners.controller.js";

import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const BannerRoutes = Router();


// Protect all routes with authentication middleware
BannerRoutes.get("/",  getAllBanners);
BannerRoutes.get("/:branch/get-all", authenticateToken, getBannersByBranch);
BannerRoutes.get("/get-id/:id", authenticateToken, getBannerById);
BannerRoutes.post("/post",  createBanner);
BannerRoutes.put("/update/:id", authenticateToken, updateBanner);
BannerRoutes.delete("/delete/:id", authenticateToken, removeBanner);

export default BannerRoutes;