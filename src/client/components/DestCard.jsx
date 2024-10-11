import React from "react"
import axios from "axios"
import {NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

const DestCard = ({ dest, isInWishlist }) => {
    // this dummy value will be replaced with a real id from redux
    const userId = useSelector(state => state.auth.userId)
    
    const dispatch = useDispatch()

    const handleAddToWishlist = async () => {
        const res = await axios.post("/api/wishlist", { destId: dest.id })
        console.log('handleAddToWishlist', res.data)
        dispatch({type: "ADD_TO_WISHLIST", payload: res.data})
    }

    const handleRemoveFromWishlist = async () => {
        const res = await axios.delete(`/api/wishlist/${dest.wishlists[0].id}`)
        console.log('handleRemoveFromWishlist', res.data)
        // We'll trigger a redux action here
        dispatch({type: "REMOVE_FROM_WISHLIST", payload: {id: dest.id}})
    }

    return (
        <div className="border border-cyan-400 w-[500px]  p-5 flex flex-col justify-center  rounded-md m-12 text-cyan-400">
            <div>
                <h1 className="text-2xl">{dest.destName}, {dest.country}</h1>
                <h2 className="text-xl mt-2">{dest.user.username}</h2>
                <h3 className="text-md mb-2">{dest.user.homeLocation}</h3>
                <div className="flex mb-2 justify-between items-center">
                    <p className="w-2/3">
                        {dest.desc.length > 49
                            ? dest.desc.trim().split("").slice(0, 30).join("") +
                              "..."
                            : dest.desc}
                    </p>
                    <NavLink to={`/root/destination/${dest.id}`} className="border-cyan-400 border text-cyan-400 p-1 rounded-md w-1/3">
                        See Full Description
                    </NavLink>
                </div>
            </div>
            <img src={dest.imgURL} className="rounded-md mb-2" />
            {userId && (isInWishlist ? (
                <button
                    className="bg-cyan-400 text-white p-1 rounded-md w-1/2 m-auto"
                    onClick={() => handleRemoveFromWishlist()}
                >
                    Remove From Wishlist
                </button>
            ) : (
                <button
                    className="bg-cyan-400 text-white p-1 rounded-md w-1/2 m-auto"
                    onClick={() => handleAddToWishlist()}
                >
                    Add to Wishlist
                </button>
            ))}
        </div>
    )
}

export default DestCard