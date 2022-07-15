import React from 'react';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Course from './courseCard';


function CourseList() {

    const [courses, setCourses] = useState([])

    let navigate = useNavigate();


    useEffect( () => {
        const url = `http://localhost:4000/admin/courses`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
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

    const courseList = courses?.map(course => <Course key={course._id} course={course} onClick={handleClick}/>)

    return (
        <div>
            {courseList}
        </div>
    )
}

export default CourseList