import Producto from "../models/Producto.models.js";
import Usuario from "../models/Usuario.models.js";
import fs from "fs";

export const findAllProductos = async (req, res) => {
    try {
        let productos = await Producto.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {status:true},
            group: ['id','nombre'],
            order: [['nombre', 'DESC']],
        });
        res.json({ code: 200, message: "OK", data: productos });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Error al consultar los productos. - error: \n ${error}`,
        });
    }
};

export const addProductos = async (req, res) => {
    //console.log(req.body);
    let { nombre, descripcion, precio } = req.body;
    //req.nombreImagen -> viene desde middleware
    //req.pathImagen ->viene desde middleware
    try {
        let nuevoProducto = {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: `/public/uploads/${req.nombreImagen}`,
            publicIdImagen: 0,
        };

        let productoCreado = await Producto.create(nuevoProducto);

        res.status(201).json({
            code: 201,
            message: `Producto creado con éxito -> id: ${productoCreado.id}, nombre: ${nombre}, precio: ${precio}`
        });
    } catch (error) {
        fs.unlinkSync(req.pathImagen);
        res.status(500).json({
            code: 500,
            message: "Error al crear el producto en la base de datos." + error,
        });
    }
};

export const editProduct = async(req, res) => {
    try{
        let {id} = req.params;
        let { nombre, descripcion, precio } = req.body;
        let producto = await Producto.findByPk(id);

        if(!producto){
            return res.status(404).json({code:404, message: 'Producto no encontrado.'})
        }
        if(req.nombreImagen){
            fs.unlinkSync(req.pathBasic + '/' + producto.img)
        }else if(!req.nombreImagen){
            console.log('no se entrego imagen')
            req.nombreImagen = producto.img,
            req.pathImagen = producto.rutaImagen
        }
        await producto.update(
            {
            nombre,
            descripcion,
            precio: Number(precio),
            img: req.nombreImagen,
            rutaImagen: req.pathImagen,
            publicIdImagen: 0,
            },
            {where: {id}}
        );
        res.status(201).json({
            code:201,
            message:`Producto ${producto.nombre} se actualizo con exito.`
        })

    }catch(error){
        fs.unlinkSync(req.pathImagen);
        console.log(req.pathImagen + ' fs exitoso')
        res.status(500).send({ 
            code: 500, 
            message: `producto no se pudo editar - error: \n ${error}`
        });
    }
}

export const changeStatus = async (req, res) => {
    try {
      let { id } = req.params;
      let {status} = req.body
      await Producto.update(
        {status},
        {where: {id}}
        )
      res.status(201).json(`Producto con id: ${id} ha sido anulado/activado: ${status}.`)
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `producto no se pudo anular - error: \n ${error}`
      });
    }
  }

export const deleteProducts = async(req, res) => {
    try {
        let {id} = req.params;
        let producto = await Producto.findByPk(id);
        if(!producto){
            return res.status(404).send('No existe ese producto');
        }
        let nombre = producto.nombre
        fs.unlinkSync(req.pathBasic + '/' + producto.img)
        await producto.destroy();

        res.status(200).json({
            code:200,
            message: `producto con id: ${id} y nombre: ${nombre} - ha sido eliminado.`
        })

    }catch(error){
        res.status(500).send({ 
            code: 500, 
            message: `producto no se pudo eliminar - error: \n ${error}`
        });
    }
}
