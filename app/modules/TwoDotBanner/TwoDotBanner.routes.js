import { Router } from "express";
import {
  createTwoDotBanner,
  getAllTwoDotBanners,
  getTwoDotBannerById,
  getTwoDotBannersByBranch,
  updateTwoDotBanner,
  removeTwoDotBanner,
} from "./TwoDotBanner.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js";

const TwoDotBannerRoutes = Router();

TwoDotBannerRoutes.get("/",  getAllTwoDotBanners);
TwoDotBannerRoutes.get("/:branch/get-all", getTwoDotBannersByBranch);
TwoDotBannerRoutes.get("/get-id/:id",  getTwoDotBannerById);
TwoDotBannerRoutes.post("/post", createTwoDotBanner);
TwoDotBannerRoutes.put("/update/:id", updateTwoDotBanner);
TwoDotBannerRoutes.delete("/delete/:id",  removeTwoDotBanner);

export default TwoDotBannerRoutes;