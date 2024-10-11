import { DataTypes } from "sequelize"
import { sequelize } from "../util/database.js"

export const Destination = sequelize.define("destination", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    destName: DataTypes.STRING,
    country: DataTypes.STRING,
    desc: DataTypes.STRING(2000),
    imgURL: DataTypes.STRING(2000)
})
