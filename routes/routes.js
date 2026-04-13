import { Router } from "express";

// Used Route Imports
import CompanyRoutes from "../app/modules/Company/Companys.routes.js";
import permissionRoutes from "../app/modules/Permission/permission.routes.js";
import userRoutes from "../app/modules/User/Users.routes.js";
import UserlogRoutes from "../app/modules/UserLog/UserLog.routes.js";
import TransactionLogRoutes from "../app/modules/TransactionLog/TransactionLog.routes.js";
import UserRoleRoutes from "../app/modules/UserRole/UserRoles.routes.js";
import rolepermissionRoutes from "../app/modules/RolePermission/rolePermission.routes.js";




// Used Controllers / Middleware
import { getImageUrl } from "../config/space.js";
import transactionLogger from "../middleware/transactionLogger.js";

// Add this line at the top with your other imports
import BannerRoutes from "../app/modules/Banner/Banners.routes.js";
import MetalTypeRoutes from "../app/modules/MetalType/MetalTypes.routes.js";
import PurityRoutes from "../app/modules/Purity/Purities.routes.js";
import DailyPriceRoutes from "../app/modules/DailyPrice/DailyPrices.routes.js";
import GoldCategoryRoutes from "../app/modules/GoldCategory/GoldCategories.routes.js";
import StockRoutes from "../app/modules/Stock/Stocks.routes.js";
import GoldProductRoutes from "../app/modules/GoldProduct/GoldProducts.routes.js";
import CustomerRoutes from "../app/modules/Customer/Customers.routes.js";

import WebProductRoutes from "../app/modules/WebProduct/WebProducts.routes.js";
import ThreeDotImageRoutes from "../app/modules/ThreeDotImage/ThreeDotImages.routes.js";
import TrendyCollectionRoutes from "../app/modules/TrendyCollection/TrendyCollections.routes.js";
import AutumnCollectionRoutes from "../app/modules/AutumnCollection/AutumnCollections.routes.js";
import TwoDotBannerRoutes from "../app/modules/TwoDotBanner/TwoDotBanner.routes.js";
import OrderRoutes from "../app/modules/Order/Orders.routes.js";
import PurchaseRoutes from "../app/modules/Purchase/Purchases.routes.js";
import SaleRoutes from "../app/modules/Sale/Sales.routes.js";
import PosSaleRoutes from "../app/modules/PosSales/PosSales.routes.js";




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

routes.use("/banners", BannerRoutes);

routes.use("/three-dot-images", ThreeDotImageRoutes);
// Add this line to the active routes section
routes.use("/two-dot-banners", TwoDotBannerRoutes);



routes.use("/metaltype", MetalTypeRoutes);
routes.use("/purities", PurityRoutes);
routes.use("/trendy-collections", TrendyCollectionRoutes);
routes.use("/autumn-collections", AutumnCollectionRoutes);
routes.use("/daily-price", DailyPriceRoutes);
routes.use("/gold-categories", GoldCategoryRoutes);

routes.use("/stock", StockRoutes); 
routes.use("/gold-products", GoldProductRoutes);


routes.use("/purchases", PurchaseRoutes);
routes.use("/orders", OrderRoutes);
routes.use("/pos-sales", PosSaleRoutes);


routes.use("/customer", CustomerRoutes);
routes.use("/sales", SaleRoutes); // Added Sale route mapping
routes.use("/web-products", WebProductRoutes);




export default routes;
