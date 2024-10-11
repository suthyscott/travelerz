import { DataTypes } from "sequelize"
import { sequelize } from "../util/database.js"

export const Wishlist = sequelize.define("wishlist", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})
