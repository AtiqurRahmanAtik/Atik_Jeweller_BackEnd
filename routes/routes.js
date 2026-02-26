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

import ProductRoutes from "../app/modules/Product/Product.routes.js";

import ProductCategoryRoutes from "../app/modules/ProductCategory/ProductCategory.routes.js";


// Used Controllers / Middleware
import { getImageUrl } from "../config/space.js";
import transactionLogger from "../middleware/transactionLogger.js";


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
routes.use("/product-categories", ProductCategoryRoutes);
routes.use("/products", ProductRoutes);





export default routes;
