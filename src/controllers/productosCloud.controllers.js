import Producto from "../models/Producto.models.js";
import { deleteFile } from "../middlewares/uploadCloud.middleware.js";


export const findAllProductos = async (req, res) => {
    try {
        let productos = await Producto.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json({ code: 200, message: "OK", data: productos });
    } catch (error) {
        console.log();
        res.status(500).json({
            code: 500,
            message: "Error al consultar los productos.",
        });
    }
};

export const addProductos = async (req, res) => {
    //console.log(req.body);
    let { nombre, descripcion, precio } = req.body;
    //req.nombreImagen -> viene desde middleware
    //req.pathImagen ->viene desde middleware
    //req.imagenId -> id de la imagen en cloudinary
    try {
        let nuevoProducto = {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: req.pathImagen,
            publicIdImagen: req.imagenId,
        };

        let productoCreado = await Producto.create(nuevoProducto);

        res.status(201).json({
            code: 201,
            message: "Producto creado con éxito.",
            data: productoCreado,
        });
    } catch (error) {
        console.log(error);
        deleteFile(req.imagenId);
        res.status(500).json({
            code: 500,
            message: "Error al crear el producto en la base de datos.",
        });
    }
};
