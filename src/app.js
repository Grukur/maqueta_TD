import express from "express";
import upload from "express-fileupload";
import cors from "cors";
import morgan from "morgan";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { create } from "express-handlebars";

//importaciones de rutas
import productosRoutes from "./routes/productos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import viewsRoutes from "./routes/views.routes.js";

const app = express();

//configuración handlebars
const hbs = create({
    partialsDir: [path.resolve(__dirname, "./views/partials")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//middlewares generales
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());

//publicacion de carpetas
app.use("/public", express.static(path.resolve(__dirname, "../public")));

//rutas de endpoints
app.use("/api/v1/productos", productosRoutes);
app.use("/api/v1/usuarios", usuariosRoutes);

//rutas de vista
app.use("/", viewsRoutes);

export default app;
