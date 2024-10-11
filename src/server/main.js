import express from "express"
import ViteExpress from "vite-express"
import session from "express-session"
import { User } from "./models/user.js"
import { Destination } from "./models/destinations.js"
import { Wishlist } from "./models/wishlist.js"
import authFuncs from "./controllers/authCtrl.js"
import destFuncs from "./controllers/destCtrl.js"
import wishlistFuncs from "./controllers/wishlistCtrl.js"
import { sequelize } from "./util/database.js"
import { seedDatabase } from "./util/seed.js"
import { config } from "dotenv"
config()
const { PORT, SECRET } = process.env

const { register, login, logout, checkUser } = authFuncs
const {
    addDestination,
    getAllDestinations,
    getUserDestinations,
    getOneDestination
} = destFuncs
const { addToWishlist, removeFromWishlist } = wishlistFuncs

User.hasMany(Destination)
Destination.belongsTo(User)

User.hasMany(Wishlist)
Wishlist.belongsTo(User)
Destination.hasMany(Wishlist)
Wishlist.belongsTo(Destination)

const app = express()

app.use(express.json())
app.use(
    session({
        secret: SECRET,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 48
        }
    })
)

app.post("/api/login", login)
app.post("/api/register", register)
app.delete("/api/logout", logout)
app.get("/api/user", checkUser)

app.get("/api/destinations", getAllDestinations)
app.post("/api/destination", addDestination)
app.get("/api/user-destinations", getUserDestinations)
app.get("/api/destination/:destId", getOneDestination)

app.post("/api/wishlist", addToWishlist)
app.delete("/api/wishlist/:wishlistId", removeFromWishlist)

// sequelize.sync({force: true}).then(() => seedDatabase())
sequelize.sync().then(() => {
    ViteExpress.listen(app, PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
    )
})
