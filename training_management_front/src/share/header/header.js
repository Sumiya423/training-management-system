import React from "react";


import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getToken } from "./../../service/authUser"

export default function Header() {

    return (
        <div className="header">
            <div className="header__menu">
                <Link to="/profile">Profile</Link>
               <Link to="/add-movie">Add Movies</Link>
                <Link to="/playlist">Play List</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/movie-chart">Movie Chart</Link>
                {/* <button onClick={signout}>Logout</button> */}
            </div>
        </div>
    )
}