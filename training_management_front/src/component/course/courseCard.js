import React from 'react';
import { useNavigate } from "react-router-dom";


function CourseCard({ course, onClick }) {

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
            method: 'DELETE'
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
        <div>
            <div style={{ backgroundColor: 'lightBlue', display: 'flex', flexDirection: 'column', margin: '50px' }} onClick={event => onClick(event, course._id)}>
                <p>Title: {course.title}</p>
                <span>Desc: {course.description}</span>
            </div>
            <div>
                <button id={course._id} onClick={editCourse}>Edit</button>
                <button id={course._id} onClick={deleteCourse}>Delete</button>
            </div>
        </div>
    )
}

export default CourseCard;