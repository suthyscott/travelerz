import React, { useState } from "react"
import { useLoaderData } from "react-router-dom"
import DestCard from "./DestCard"
import { useSelector } from "react-redux"

const Home = () => {
    const { allDestinations } = useLoaderData()
    const [searchNames, setSearchNames] = useState("")
    const [searchDescs, setSearchDescs] = useState("")

    // These dummy values will be replaced with actual values from redux
    const userId = useSelector(state => state.auth.userId)
    const wishlist = useSelector(state => state.wishlist)
    const wishlistIds = wishlist.map(el => el.id)
    
    return (
        <div className="flex flex-col w-full">
            <section className="flex h-[10vh] items-center justify-evenly">
                <input
                    className="border border-cyan-400 w-1/4 focus:outline-cyan-400 text-cyan-400 p-1 rounded-md"
                    placeholder="Search destination names"
                    value={searchNames}
                    onChange={e => setSearchNames(e.target.value)}
                />
                <input
                    className="border border-cyan-400 w-1/4 focus:outline-cyan-400 text-cyan-400 p-1 rounded-md"
                    placeholder="Search destination descriptions"
                    value={searchDescs}
                    onChange={e => setSearchDescs(e.target.value)}
                />
            </section>
            <section className="flex flex-wrap justify-center items-center">
                {allDestinations
                    .filter(dest => dest.userId !== userId)
                    .filter(dest => {
                        return dest.destName
                            .toLowerCase()
                            .includes(searchNames.toLowerCase())
                    })
                    .filter(dest => {
                        return dest.desc
                            .toLowerCase()
                            .includes(searchDescs.toLowerCase())
                    })
                    .map(dest => (
                        <DestCard
                            key={dest.id}
                            dest={dest}
                            isInWishlist={
                                wishlistIds.includes(dest.id)
                                    ? true
                                    : false
                            }
                        />
                    ))}
            </section>
        </div>
    )
}

export default Home