import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';

function CourseCard({ course, onClick }) {
    const { state: authState } = React.useContext(AuthContext)
    let navigate = useNavigate();
    const editCourse = (e) => {
        const clicked_div = e.currentTarget;
        const selected_course_id = clicked_div.id
        navigate(`/edit-course/${selected_course_id}`)
    }
    const deleteCourse = (e) => {
        const clicked_div = e.currentTarget;
        const selected_course_id = clicked_div.id;
        console.log(selected_course_id)
        fetch(`http://localhost:4000/admin/delete-course/${selected_course_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + authState.token,
            },
        })
            .then((res) => {
                console.log(res);
                console.log(res.status);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className='list__batch__container'>
            <div className='list__batch__container__body' onClick={event => onClick(event, course._id)}>
                <h2 className='list__batch__container__title'> {course.title}</h2>
                <p className='list__batch__container__des'>{(course.description).slice(0, 200)}<span style={{ fontWeight: 'bold' }}>...</span></p>
                <p className='list__batch__container__des'><span>Start-Date:</span> {JSON.stringify(new Date(course.startDate)).slice(1, 11)}</p>
                <p className='list__batch__container__des'><span>End-Date:</span> {JSON.stringify(new Date(course.endDate)).slice(1, 11)}</p>
            </div>
            {authState.user.isAdmin && <div>
                <button className='list__batch__container__btn edit' id={course._id} onClick={editCourse}>Edit</button>
                <button className='list__batch__container__btn delete' id={course._id} onClick={deleteCourse}>Delete</button>
            </div>}
        </div>
    )
}

export default CourseCard;