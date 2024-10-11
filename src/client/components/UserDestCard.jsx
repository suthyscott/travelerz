import React from "react"
import {NavLink} from 'react-router-dom'

const UserDestCard = ({ dest }) => {
    return (
        <div className="border border-cyan-400 w-[500px] m-10 p-5 flex flex-col justify-center  rounded-md my-12 text-cyan-400">
            <div>
                <h1 className="text-2xl">{dest.destName}</h1>
                <h2 className="text-xl my-2">{dest.country}</h2>
                <div className="flex mb-2 justify-between items-center">
                    <p className="w-2/3">{dest.desc.length > 49 ? (dest.desc.trim().split('').slice(0, 50).join('') + '...') : dest.desc}</p>
                    <NavLink to={`/root/destination/${dest.id}`} className="bg-cyan-400 text-white p-1 rounded-md w-1/3">
                        See Full Description
                    </NavLink>
                </div>
            </div>
            <img src={dest.imgURL} className="rounded-md"/>
        </div>
    )
}

export default UserDestCard