import React from 'react';

function UserCard({ user, onClick }) {

    return (
        <div className='list__batch__container' style={{display: "block"}}>
            <div style={{display: "flex"}} onClick={event => onClick(event, user._id)}>
                <div><img style={{padding: '14px'}} src={"http://localhost:4000/"+user.imageUrl} alt="user" width="80" height="60"/></div>
                <div>
                    <p style={{fontSize: "20px", lineHeight: "10px"}} className='list__batch__container__title'> {user.name}</p>
                    <p className='list__batch__container__des'>{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard;