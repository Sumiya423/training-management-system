import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../App';


export default function Header() {

    let navigate = useNavigate();
    const { state, dispatch } = React.useContext(AuthContext)
    const signout = () => {
        dispatch({
            type: "LOGOUT",
        })
        navigate('/signin')
    }
    return (
        <div className="header sticky">
            <div className="header__menu">
                <img className="header__menu__logo" src="logo.png" />
                {state.user.isAdmin && <Link to="/admin/users">Users</Link>}
                {state.user.isAdmin && <Link to="/admin/courses">Courses</Link>}
                {state.user.isAdmin && <Link to="/admin/batches">Batches</Link>}
                {state.user.isTrainer && <Link to="/courses">My Courses</Link>}
                {!state.user.isTrainer && !state.user.isAdmin && <Link to="/courses">Courses</Link>}
                {!state.user.isTrainer && !state.user.isAdmin && <Link to="/batches">Batches</Link>}
                <Link to="/quizes">Quizes</Link>
                <Link style={{color: 'aqua'}} to="/profile"><img src='user.jpg'/>{state.user.name}</Link>
                {state.isAuthenticated && <button onClick={signout}>Logout</button>}
                
            </div>
        </div>
    )
}