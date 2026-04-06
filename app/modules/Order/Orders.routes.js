import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByBranch,
  updateOrder,
  removeOrder,
} from "./Orders.controller.js";
import { authenticateToken } from "../../../middleware/authMiddleware.js"; 

const OrderRoutes = Router();

// Protect all routes with authentication middleware
OrderRoutes.get("/",  getAllOrders);
OrderRoutes.get("/:branch/get-all",  getOrdersByBranch);
OrderRoutes.get("/get-id/:id",  getOrderById);
OrderRoutes.post("/post",  createOrder);
OrderRoutes.put("/update/:id",  updateOrder);
OrderRoutes.delete("/delete/:id",  removeOrder);

export default OrderRoutes;