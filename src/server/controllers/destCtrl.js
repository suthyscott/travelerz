import { Destination } from "../models/destinations.js"
import {Wishlist} from '../models/wishlist.js'
import {User} from '../models/user.js'

export default {
    getAllDestinations: async (req, res) => {
        try {
            const allDests = await Destination.findAll({
                include: [Wishlist, User]
            })
            res.status(200).send(allDests)
        } catch (err) {
            console.log("Oy, problem in getAllDestinations", err)
            res.sendStatus(500)
        }
    },
    addDestination: async (req, res) => {
        try {
            const {destName, country, desc, imgURL} = req.body

            await Destination.create({desc, destName, country, imgURL, userId: req.session.user.userId})
            const userDests = await Destination.findAll({where: {userId: req.session.user.userId}})

            console.log('addDestination', req.session.user)
            res.status(200).send(userDests)
            
        } catch (err) {
            console.log("Oy, problem in addDestination", err)
            res.sendStatus(500)
        }
    },
    getUserDestinations: async (req, res) => {
        try {
            const userDests = await Destination.findAll({where: {userId: req.session.user.userId}})
            console.log('getUserDestinations', req.session.user)
            res.status(200).send(userDests)
        } catch (err) {
            console.log("Oy, problem in getuserDestinations", err)
            res.sendStatus(500)
        }
    },
    getOneDestination: async (req, res) => {
        try {
            const {destId} = req.params
            const dest = await Destination.findByPk(destId, {
                include: [Wishlist, User]
            })
            res.status(200).send(dest)
        } catch (err) {
            console.log("Oy, problem in getuserDestinations", err)
            res.sendStatus(500)
        }
    }
}
