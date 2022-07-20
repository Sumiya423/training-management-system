import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';

function UserCard({ user, onClick }) {
    const { state: authState } = React.useContext(AuthContext)
    let navigate = useNavigate();
    // const editCourse = (e) => {
    //     const clicked_div = e.currentTarget;
    //     const selected_course_id = clicked_div.id
    //     navigate(`/admin/courses/${selected_course_id}/edit`)
    // }
    // const deleteCourse = (e) => {
    //     const clicked_div = e.currentTarget;
    //     const selected_course_id = clicked_div.id;
    //     console.log(selected_course_id)
    //     fetch(`http://localhost:4000/admin/delete-course/${selected_course_id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'authorization': 'Bearer ' + authState.token,
    //         },
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             console.log(res.status);
    //             window.location.reload(false);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    return (
        <div className='list__batch__container' style={{display: "block"}}>
            <div style={{display: "flex"}} onClick={event => onClick(event, user._id)}>
                <div><img style={{padding: '14px'}} src={"http://localhost:4000/"+user.imageUrl} alt="user" width="80" height="60"/></div>
                <div>
                    <p style={{'font-size': "20px", "line-height": "10px"}} className='list__batch__container__title'> {user.name}</p>
                    <p className='list__batch__container__des'>{user.email}</p>
                </div>
            </div>
            {authState.user.isAdmin && <div>
                {/* <button className='list__batch__container__btn edit' id={course._id} onClick={editCourse}>Edit</button>
                <button className='list__batch__container__btn delete' id={course._id} onClick={deleteCourse}>Delete</button> */}
            </div>}
        </div>
    )
}

export default UserCard;