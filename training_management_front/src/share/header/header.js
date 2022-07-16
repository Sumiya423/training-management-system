import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../App';


export default function Header() {

    let navigate = useNavigate();
    const {state, dispatch} = React.useContext(AuthContext)

    const signout = () => {
        dispatch({
            type: "LOGOUT",
        })
        navigate('/signin')
    }
    return (
        <div className="header">
            <div className="header__menu">
                <Link to="/profile">Profile</Link>
                {state.isAuthenticated && <button onClick={signout}>Logout</button>}
            </div>
        </div>
    )
}