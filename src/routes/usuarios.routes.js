import { Router } from "express";
import { addUsuario, login, findAllUsuarios } from "../controllers/usuarios.controllers.js";
import {emitToken} from "../middlewares/auth.middleware.js"
const router = Router();



//ruta post usuarios
router.get("/", findAllUsuarios);
router.post("/", addUsuario);
router.post("/login", emitToken, login);

export default router;
