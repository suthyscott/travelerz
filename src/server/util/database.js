import { config } from 'dotenv'
config()
const {CONNECTION_STRING} = process.env
import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // }
})