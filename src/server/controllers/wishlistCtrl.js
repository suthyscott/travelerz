import { Wishlist } from "../models/wishlist.js"
import { Destination } from "../models/destinations.js"
import {User} from '../models/user.js'

export default {
    addToWishlist: async (req, res) => {
        try {
            const { destId } = req.body
            await Wishlist.create({ destinationId: destId, userId: req.session.user.userId })
            const wishedDest = await Destination.findByPk(destId, {
                include: [Wishlist, User]
            })

            req.session.user.wishlist.push(wishedDest)
            console.log('user wishlist:', req.session.user)
            res.status(200).send(wishedDest)
        } catch (err) {
            console.log("Oy, problem in addToWishlist", err)
            res.sendStatus(500)
        }
    },
    removeFromWishlist: async (req, res) => {
        try {
            const {wishlistId} = req.params

            await Wishlist.destroy({where: {id: wishlistId}})
            const index = req.session.user.wishlist.findIndex(dest => +dest.id === +wishlistId)

            req.session.user.wishlist.splice(index, 1)
            console.log('user wishlist:', req.session.user)
            res.sendStatus(200)
        } catch (err) {
            console.log("Oy, problem in removeFromWishlist", err)
            res.sendStatus(500)
        }
    }
}