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
                <img className="header__menu__logo" src="./logo.png"/>
                <Link to="/profile">Profile</Link>
                <Link to="/trainer">Trainer</Link>
                <Link to="/trainee">Trainee</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/batches">Batches</Link>
                <Link to="/trainee">Quizes</Link>
                {state.isAuthenticated && <button onClick={signout}>Logout</button>}
           </div>
        </div>
    )
}