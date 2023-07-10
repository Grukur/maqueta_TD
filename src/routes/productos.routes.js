import { Router } from "express";
import { addProductosCloud, editProductCloud, deleteProductsCloud } from "../controllers/productosCloud.controllers.js";
import { findAllProductos, addProductos, editProduct, changeStatus, deleteProducts } from "../controllers/productos.controllers.js";
import {uploadFiles, editFiles} from "../middlewares/upload.middleware.js"
import { uploadFilesCloud } from "../middlewares/uploadCloud.middleware.js";
import { verifyToken, validateAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

//ruta findAll productos

//ruta productos
router.get("/", findAllProductos);
router.post("/", verifyToken, uploadFiles, addProductos);
router.put("/:id", verifyToken, validateAdmin, editFiles, editProduct);
router.delete("/:id", verifyToken, validateAdmin, changeStatus);
router.delete("/destroy/:id", verifyToken, validateAdmin, editFiles, deleteProducts);

//ruta productos cloud
router.post("/cloud", verifyToken, uploadFilesCloud, addProductosCloud);
router.put("/cloud/:id", verifyToken, validateAdmin, uploadFilesCloud, editProductCloud);
router.delete("/cloud/destroy/:id", verifyToken, validateAdmin, deleteProductsCloud);


export default router;
