import Usuario from "../models/Usuario.models.js";

export const addUsuario = async (req, res) => {
    try {
        let { nombre, rut, email, password, admin } = req.body;
        let nuevoUsuario = await Usuario.create({
            nombre,
            rut,
            email,
            password,
            admin
        });
        res.status(201).json({
            code: 201,
            message: `Se ha creado el usuario ${nombre}, con ID: ${nuevoUsuario.id}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al crear el usuario.",
        });
    }
};

export const login = async (req, res) => {
    res.json({ code: 200, message: "Login correcto.", token: req.token });
};

export const findAllUsuarios = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password", "admin"],
            },
        });
        res.json({ code: 200, message: "OK", data: usuarios });
    } catch (error) {
        console.log();
        res.status(500).json({
            code: 500,
            message: "Error al consultar los usuarios.",
        });
    }
};
