import { Router } from "express";
import { findAllProductos, addProductos } from "../controllers/productosCloud.controllers.js";
import {uploadFiles} from "../middlewares/upload.middleware.js"
import { uploadFilesCloud } from "../middlewares/uploadCloud.middleware.js";
import { verifyToken, validarAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

//ruta findAll productos
router.get("/", findAllProductos);

//ruta post productos

router.post("/", verifyToken, uploadFiles, addProductos);
router.post("/cloud", uploadFilesCloud, addProductos);


export default router;
