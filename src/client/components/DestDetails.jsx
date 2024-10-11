import React from "react"
import { useLoaderData } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const DestDetails = () => {
    const { dest } = useLoaderData()
    const dispatch = useDispatch()

    const wishlist = useSelector(state => state.wishlist)
    const wishlistIds = wishlist.map(el => el.id)

    const handleAddToWishlist = async () => {
        const res = await axios.post("/api/wishlist", { destId: dest.id })
        console.log("handleAddToWishlistr", res.data)
        dispatch({ type: "ADD_TO_WISHLIST", payload: res.data })
    }

    const handleRemoveFromWishlist = async () => {
        const res = await axios.delete(`/api/wishlist/${dest.wishlists[0].id}`)
        console.log("handleRemoveFromWishlist", res.data)
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id: dest.id } })
    }

    return (
        <section className="w-full h-[90vh] flex justify-start items-start p-[10%] text-cyan-400">
            <img src={dest.imgURL} className="w-1/2" />
            <div className="pl-6 flex flex-col  h-full">
                <h1 className="text-2xl">
                    {dest.destName}, {dest.country}
                </h1>
                <h2 className="text-xl mt-2">{dest.user.username}</h2>
                <h3 className="text-md mb-2">{dest.user.homeLocation}</h3>
                <p className="mb-7">{dest.desc}</p>
                {wishlistIds.includes(dest.id) ? (
                    <button
                        className="w-[180px] h-10 bg-cyan-400 text-white rounded-md p-1"
                        onClick={() => handleRemoveFromWishlist()}
                    >
                        Remove From Wishlist
                    </button>
                ) : (
                    <button
                        className="w-[180px] h-10 bg-cyan-400 text-white rounded-md p-1"
                        onClick={() => handleAddToWishlist()}
                    >
                        Add to Wishlist
                    </button>
                )}
            </div>
        </section>
    )
}

export default DestDetails