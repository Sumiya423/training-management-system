import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import CourseCard from './courseCard';
import { AuthContext } from '../../App';


function CourseList() {

    const [courses, setCourses] = useState([])
    const { state: authState } = React.useContext(AuthContext)

    let navigate = useNavigate();


    useEffect(() => {
        const url = `http://localhost:4000/admin/courses`;

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
                setCourses(json.results);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [])

    const handleClick = (event, course_id) => {
        console.log(course_id);
        navigate(`/admin/courses/${course_id}`);
    }

    const courseList = courses?.map(course => <CourseCard key={course._id} course={course} onClick={handleClick} />)
    console.log(authState)

    return (
        <div className='list'>
            <h2 className='list__header'>Courses</h2>
            <hr className='list__hr'></hr>
            {authState.user.isAdmin && <Link to='/admin/courses/create' className='list__create-batch'>Create Course</Link>}
            <div className='list__batch'>
                {courseList}
            </div>
        </div>
    )
}

export default CourseList