import { Router } from "express";

// Used Route Imports
import CompanyRoutes from "../app/modules/Company/Companys.routes.js";
import permissionRoutes from "../app/modules/Permission/permission.routes.js";
import userRoutes from "../app/modules/User/Users.routes.js";
import UserlogRoutes from "../app/modules/UserLog/UserLog.routes.js";
import TransactionLogRoutes from "../app/modules/TransactionLog/TransactionLog.routes.js";
import UserRoleRoutes from "../app/modules/UserRole/UserRoles.routes.js";
import rolepermissionRoutes from "../app/modules/RolePermission/rolePermission.routes.js";

import bannerRoutes from "../app/modules/Banner/Banners.routes.js";
import threeDotImageRoutes from "../app/modules/ThreeDotImage/ThreeDotImages.routes.js";






// Used Controllers / Middleware
import { getImageUrl } from "../config/space.js";
import transactionLogger from "../middleware/transactionLogger.js";

import MetalTypeRoutes from "../app/modules/MetalType/MetalTypes.routes.js";
import PurityRoutes from "../app/modules/Purity/Purities.routes.js";
import DailyPriceRoutes from "../app/modules/DailyPrice/DailyPrices.routes.js";
import GoldCategoryRoutes from "../app/modules/GoldCategory/GoldCategories.routes.js";
import StockRoutes from "../app/modules/Stock/Stocks.routes.js";
import GoldProductRoutes from "../app/modules/GoldProduct/GoldProducts.routes.js";



const routes = Router();

// Middleware
routes.use(transactionLogger);

// Active Routes
routes.use("/company", CompanyRoutes);
routes.use("/permissions", permissionRoutes);
routes.use("/user", userRoutes);
routes.use("/userlog", UserlogRoutes);
routes.use("/transaction-logs", TransactionLogRoutes);
routes.use("/userrole", UserRoleRoutes);
routes.use("/role-permissions", rolepermissionRoutes);
routes.post("/get-image-url", getImageUrl);
routes.use("/banners", bannerRoutes);
routes.use("/three-dot-images", threeDotImageRoutes);



routes.use("/metaltype", MetalTypeRoutes);
routes.use("/purities", PurityRoutes);
routes.use("/daily-price", DailyPriceRoutes);
routes.use("/gold-categories", GoldCategoryRoutes);
routes.use("/stock", StockRoutes); 
routes.use("/gold-products", GoldProductRoutes);




export default routes;
