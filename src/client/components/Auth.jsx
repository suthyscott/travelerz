import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Auth = () => {
    const [isRegistering, setIsRegistering] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [homeLocation, setHomeLocation] = useState("")

    const dispatch = useDispatch()

    const handleFormSubmit = async e => {
        e.preventDefault()
        const res = await axios.post(
            `/api/${isRegistering ? "register" : "login"}`,
            {
                username,
                homeLocation,
                password
            }
        )
        console.log("authenticated", res.data)
        dispatch({
            type: "LOGIN",
            payload: { userId: res.data.userId, username: res.data.username }
        })
        // navigate()
    }

    return (
        <div className="border border-cyan-400 w-1/2 m-auto mt-[20vh] h-[40vh] flex flex-col items-center justify-evenly text-cyan-400 rounded-lg">
            <h1 className="text-3xl">Welcome to Travelerz!</h1>
            <h2>Please {isRegistering ? "register" : "login"} below </h2>
            <form
                className="h-2/5 w-3/4 flex flex-col justify-between items-center"
                onSubmit={e => handleFormSubmit(e)}
            >
                <input
                    className="border border-cyan-400 rounded-lg p-1 w-3/4"
                    placeholder="Enter your username"
                    onChange={e => setUsername(e.target.value)}
                />
                {isRegistering ? (
                    <input
                        className="border border-cyan-400 rounded-lg p-1 w-3/4"
                        placeholder="Your state/region and country"
                        onChange={e => setHomeLocation(e.target.value)}
                    />
                ) : null}
                <input
                    className="border border-cyan-400 rounded-lg p-1 w-3/4"
                    placeholder="Enter your password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="bg-cyan-400 text-white p-1 rounded-lg w-1/4"
                    type="submit"
                >
                    {isRegistering ? "Register" : "Login"}
                </button>
            </form>
            <button
                className="text-cyan-400"
                onClick={() => setIsRegistering(!isRegistering)}
            >
                Click here to {isRegistering ? "login" : "register"}
            </button>
        </div>
    )
}

export default Auth
