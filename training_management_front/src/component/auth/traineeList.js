import React from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";


export const Trainee = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const { state: authState } = React.useContext(AuthContext)
  
  return (
    <div className="userspage">
      <div className="userspage__container">
        <button onClick={createTrainee}>Create Trainee</button>
      </div>
    </div>

  );
};
export default Trainee;