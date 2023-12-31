import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Usuario = sequelize.define(
    "usuarios",
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rut: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [8]
            }
        },    
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: true,
    }
);

export default Usuario;
