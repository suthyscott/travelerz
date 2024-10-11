import bcrypt from "bcryptjs"
import { User } from "../models/user.js"
import { Wishlist } from "../models/wishlist.js"
import { Destination } from "../models/destinations.js"

export default {
    register: async (req, res) => {
        try {
            const { username, password, homeLocation } = req.body
            let foundUser = await User.findOne({
                where: { username: username.trim() }
            })

            if (foundUser) {
                res.status(400).send("That username has already been taken.")
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({
                    username,
                    homeLocation,
                    hashedPass: hash
                })

                req.session.user = {
                    username: newUser.username,
                    userId: newUser.id,
                    wishlist: []
                }
                console.log(
                    "User Registered Successfully. Session:",
                    req.session.user
                )
                res.status(200).send(req.session.user)
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            let foundUser = await User.findOne({
                where: { username: username.trim() }
            })

            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(
                    password,
                    foundUser.hashedPass
                )

                if (isAuthenticated) {
                    const userWishlist = await Destination.findAll({
                        include: [
                            {
                                model: Wishlist,
                                where: { userId: foundUser.id }
                            }, User
                        ]
                    })
                    req.session.user = {
                        username: foundUser.username,
                        userId: foundUser.id,
                        wishlist: userWishlist
                    }
                    console.log(
                        "User Logged in Successfully. Session:",
                        req.session.user
                    )
                    res.status(200).send(req.session.user)
                } else {
                    res.status(400).send("That password is incorrect")
                }
            } else {
                res.status(400).send("No user with that username exists.")
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    logout: (req, res) => {
        try {
            req.session.destroy()
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    checkUser: (req, res) => {
        try {
            if(req.session.user){
                console.log(req.session.user)
                res.status(200).send(req.session.user)
                return
            } else {
                if(req.session.wishlist){
                    console.log(req.session)
                    res.status(200).send(req.session.wishlist)
                } else {
                    req.session.wishlist = []
                    res.status(200).send(req.session.wishlist)
                }
            }
        } catch (err) {
            console.log("Oy, problem in checkUserWishlist", err)
            res.sendStatus(500)
        }
    }
}