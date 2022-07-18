import React from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";


export const Trainer = () => {
    let navigate = useNavigate();
    function createTrainee() {
        navigate('/admin/trainer/create')
    }
    return (
        <div className="userspage">
            <div className="userspage__container">
                <button onClick={createTrainee}>Create Trainer</button>
            </div>
        </div>

    );
};
export default Trainer;