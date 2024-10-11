import { useState, useEffect } from "react"
import axios from "axios"
import { useLoaderData } from "react-router-dom"
import UserDestCard from "./UserDestCard"

const MyDestinations = () => {
    const [userDestinations, setUserDestinations] = useState(useLoaderData())
    const [destName, setDestName] = useState("")
    const [country, setCountry] = useState("")
    const [desc, setDesc] = useState("")
    const [imgURL, setImgURL] = useState("")

    const handleAddDest = async (e) => {
      e.preventDefault()
      const res = await axios.post('/api/destination', {destName, country, desc, imgURL})

      setDestName('')
      setCountry('')
      setDesc('')
      setImgURL('')
      setUserDestinations(res.data)

      alert('Your destination has been added!')
    }

    return (
        <div className="flex h-[90vh] w-full">
            <div className="w-1/3 h-full flex justify-center items-center p-5">
                <form onSubmit={e => handleAddDest(e)} className="border-2 border-cyan-400 rounded-md h-1/2 w-3/4 flex flex-col justify-evenly  items-center p-5">
                    <input
                        className="border border-cyan-400 p-1 rounded-md "
                        placeholder="Destination Name"
                        value={destName}
                        onChange={e => setDestName(e.target.value)}
                    />
                    <input
                        className="border border-cyan-400 p-1 rounded-md "
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                    <input
                        className="border border-cyan-400 p-1 rounded-md "
                        placeholder="Description"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                    <input
                        className="border border-cyan-400 p-1 rounded-md "
                        placeholder="Paste an image URL"
                        value={imgURL}
                        onChange={e => setImgURL(e.target.value)}
                    />
                    <button className="bg-cyan-400 text-white w-[150px] p-1 rounded-md" type="submit">Add Destination</button>
                </form>
            </div>
            <section className="w-2/3 h-full overflow-auto p-10 mb-3 flex flex-wrap border-l border-cyan-400">
              {userDestinations.map(dest => <UserDestCard key={dest.id} dest={dest}/>)}
            </section>
        </div>
    )
}

export default MyDestinations