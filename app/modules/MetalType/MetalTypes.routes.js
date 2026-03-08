import { Router } from "express";
import {
  createMetalType,
  getAllMetalTypes,
  getMetalTypeById,
  getMetalTypesByBranch,
  updateMetalType,
  removeMetalType,
} from "./MetalTypes.controller.js";


const MetalTypeRoutes = Router();


// Protect all routes with authentication middleware
MetalTypeRoutes.get("/",  getAllMetalTypes);
MetalTypeRoutes.get("/:branch/get-all",  getMetalTypesByBranch);
MetalTypeRoutes.get("/get-id/:id",  getMetalTypeById);
MetalTypeRoutes.post("/post",  createMetalType);
MetalTypeRoutes.put("/update/:id",  updateMetalType);
MetalTypeRoutes.delete("/delete/:id",  removeMetalType);


export default MetalTypeRoutes;