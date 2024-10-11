import {useEffect} from "react"
import DestCard from "./DestCard"
import { useSelector } from "react-redux"

const Wishlist = () => {
    // We'll update this dummy value to have a real value from redux.
    const  wishlist = useSelector(state => state.wishlist)

    return (
        <section className="flex flex-wrap justify-center items-center">
            {wishlist.map(dest => (
                <DestCard key={dest.id} dest={dest} isInWishlist={true} />
            ))}
        </section>
    )
}

export default Wishlist