import React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';

export default function UserProfile() {

  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const { state: authState } = React.useContext(AuthContext);
  const { userId } = useParams();  
  useEffect(() => {

    const url = `http://localhost:4000/admin/users/${userId}`;

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
        console.log(json);
        setUser(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData()
  }, [userId])

  const deleteUser = (e) => {

    fetch(`http://localhost:4000/admin/delete-user/${userId}`, {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer ' + authState.token,
      },
    })
      .then((res) => {
        navigate('/admin/users/')
      })
      .catch((err) => {
        console.log(err);
      });
  }



  return (
    <div className='profile'>
      <h2 className='profile__header'>{user.name}'s Profile</h2>
      <hr></hr>
      <div className='profile__container'>
        <img className='profile__container__img' src={'http://localhost:4000/' + user.imageUrl} />
        <div className='profile__container__name'>Name:
          <p>{user.name}</p>
        </div>
        <div className='profile__container__name'>Email:
          <p>{user.email}</p>
        </div>
        {user.about && <div className='profile__container__name'>About:
          <p> {user.about}</p>
        </div>}
      </div>
      {!(user._id === authState.user._id) && <button onClick={deleteUser}>Delete User</button>}
    </div>
  )
}
