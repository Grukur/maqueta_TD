import Usuario from "../models/Usuario.models.js";

export const addUsuario = async (req, res) => {
    try {
        let { nombre, rut, email, password, admin } = req.body;
        if(password.length < 8){
            return res.status(406).send("La contraseña debe tener minimo 8 caracteres.")
        }
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
            attributes: {exclude: ["createdAt", "updatedAt", "password", "admin"]},
            where:{status:true},
            order: [['nombre', 'ASC']],
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

export const editUser = async(req, res) => {
    try{
        let {id} = req.params;
        let { nombre, rut, email, password, admin } = req.body;
        let usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({code:404, message: 'Usuario no encontrado.'})
        }

        await usuario.update(
            {
            nombre,
            rut,
            email,
            password,
            admin,
            },
            {where: {id}}
        );
        res.status(201).json({
            code:201,
            message:`Usuario ${usuario.nombre} se actualizo con exito.`
        })

    }catch(error){
        res.status(500).send({ 
            code: 500, 
            message: `Usuario con id y nombre: ${id} - ${nombre} no se pudo editar - error: \n ${error}`
        });
    }
}

export const changeStatus = async (req, res) => {
    try {
      let { id } = req.params;
      let {status} = req.body
      await Usuario.update(
        {status},
        {where: {id}}
        )
      res.status(201).send(`Usuario con id: ${id} ha sido anulado.`)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        code: 500,
        message: `Usuario con id: ${id} no se pudo anular - error: \n ${error}`
      });
    }
  }

  export const deleteUser = async(req, res) => {
    try {
        let {id} = req.params;
        let usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).send('No existe ese usuario');
        }
        let nombre = usuario.nombre
        await usuario.destroy();

        res.status(200).json({
            code:200,
            message: `usuario con id y nombre: ${id} - ${nombre} ha sido eliminado.`
        })

    }catch(error){
        res.status(500).send({ 
            code: 500, 
            message: `usuario con id y nombre: ${id} - ${nombre} no se pudo eliminar - error: \n ${error}`
        });
    }
}
