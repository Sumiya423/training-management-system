import React from 'react';
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../App';


function CourseDetails() {

    const { courseId } = useParams();

    const [course, setCourse] = useState([])
    const {state: authState} = React.useContext(AuthContext)

    useEffect( () => {

        const url = `http://localhost:4000/admin/courses/${courseId}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setCourse(json.results);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [courseId])


    const topicList = course.topics?.map((topic, i) => <li key={i}>{topic}</li>)

    console.log(authState)

    return (
        <div>
            <h3>Title: {course.title}</h3>
            <p>Desc: {course.description}</p>
            Topics:
            <ol>
                
                { topicList }
                
            </ol>
            <p>Start-date: {course.startDate}</p>
            <p>Start-date: {course.endDate}</p>
        </div>
    )
}

export default CourseDetails