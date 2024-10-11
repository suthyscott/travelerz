import { DataTypes } from "sequelize"
import { sequelize } from "../util/database.js"

export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: DataTypes.STRING,
    hashedPass: DataTypes.STRING,
    homeLocation: DataTypes.STRING
})
