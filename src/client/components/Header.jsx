import React from "react"
import { NavLink } from "react-router-dom"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    const userId = useSelector(state => state.auth.userId)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const res = await axios.delete("/api/logout")
        console.log("logout", res.data)
        dispatch({ type: "LOGOUT" })
        // navigate("/root/auth")
    }

    return (
        <nav className="h-[10vh] bg-cyan-600 flex justify-between items-center p-4 text-white">
            <NavLink to="/root/home" className="text-3xl">
                Travelerz
            </NavLink>
            <div className="w-2/5 flex flex-row-reverse justify-between">
                {userId ? (
                    <>
                        <NavLink onClick={() => handleLogout()} to="/root/home">
                            Logout
                        </NavLink>
                        <NavLink to="/root/myDestinations">
                            My Destinations
                        </NavLink>
                        <NavLink to="/root/wishlist">Wishlist</NavLink>
                    </>
                ) : (
                    <span>
                        Want to see your wishlist and destinations?{" "}
                        <NavLink to="/root/auth" className="text-yellow-300">
                            Login
                        </NavLink>
                    </span>
                )}
            </div>
        </nav>
    )
}

export default Header
