import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../App';


export default function Header() {

    let navigate = useNavigate();
    const { state, dispatch } = React.useContext(AuthContext)
    console.log('state', state);
    const signout = () => {
        dispatch({
            type: "LOGOUT",
        })
        navigate('/signin')
    }
    return (
        <div className="header">
            <div className="header__menu">
                <img className="header__menu__logo" src="logo.png" />
                <Link to="/profile">Profile</Link>
                {state.user.isAdmin && <Link to="/admin/trainer">Trainer</Link>}
                {state.user.isAdmin && <Link to="/admin/trainee">Trainee</Link>}
                {state.user.isAdmin && <Link to="/admin/courses">Courses</Link>}
                {state.user.isAdmin && <Link to="/admin/batches">Batches</Link>}
                {state.user.isTrainer && <Link to="/courses">My Courses</Link>}
                {!state.user.isTrainer && !state.user.isAdmin && <Link to="/courses">Courses</Link>}
                {!state.user.isTrainer && !state.user.isAdmin && <Link to="/batches">Batches</Link>}
                {state.user.isTrainer && <Link to="/quizes">Quizes</Link>}
                {!state.user.isTrainer && !state.user.isAdmin && <Link to='/quizes'>My Quizes</Link>}
                {state.isAuthenticated && <button onClick={signout}>Logout</button>}
            </div>
        </div>
    )
}