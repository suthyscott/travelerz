import { useState, useEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

function useAuth() {
    const [loading, setLoading] = useState(true)
    const [authUserId, setAuthUserId] = useState(null)

    const userId = useSelector(state => state.auth.userId)
    const dispatch = useDispatch()

    const handleCheckUser = async () => {
        const res = await axios.get("/api/user")
        console.log("handleCheckUser", res.data)
        if (res.data.userId) {
            setLoading(false)
            setAuthUserId(res.data.userId)
            dispatch({
                type: "LOGIN",
                payload: {
                    username: res.data.username,
                    userId: res.data.userId
                }
            })
            dispatch({ type: "UPDATE_WISHLIST", payload: res.data.wishlist })
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleCheckUser()
    }, [])

    return { authUserId, loading }
}

export default useAuth
