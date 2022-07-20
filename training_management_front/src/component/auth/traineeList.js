import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from '../../App';
import UserCard from './user';


function Trainee() {

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const { state: authState } = React.useContext(AuthContext)

  let navigate = useNavigate();


  useEffect(() => {
    const url = `http://localhost:4000/admin/users`;

    const fetchData = async () => {
      try {
        const response = await fetch(url,
          {
            method: "GET",
            headers: {
              'authorization': 'Bearer ' + authState.token,
            },
          });
        const json = await response.json();
        setUsers(json.results);
        setFilteredUsers(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData()
  }, [])

  const handleClick = (event, userId) => {
    navigate(`/admin/user/${userId}`);
  }

  const userList = filteredUsers?.map(user => <UserCard key={user._id} user={user} onClick={handleClick} />)
  console.log(authState)

  return (
    <div className='list'>
      <h2 className='list__header'>User List</h2>
      <hr className='list__hr'></hr>
      <div style={{display: "flex", justifyContent: "space-between", width: "800px"}}>
        <div>
          <Link to='/admin/trainee/create'>Create Trainee</Link>
          <Link to='/admin/trainer/create'>Create Trainer</Link>
        </div>
        <div>
          <button onClick={e => setFilteredUsers(users)}>All</button>
          <button onClick={e => setFilteredUsers(users.filter(user => !user.isTrainer))}>Trainee</button>
          <button onClick={e => setFilteredUsers(users.filter(user => user.isTrainer))}>Trainer</button>
        </div>
      </div>
      <div className='list__batch'>
        {userList}
      </div>
    </div>
  )
}

export default Trainee