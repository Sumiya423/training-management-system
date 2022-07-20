import React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../App';


function CourseDetails() {

    const { courseId } = useParams();

    const [course, setCourse] = useState([])
    const { state: authState } = React.useContext(AuthContext)

    useEffect(() => {

        const url = `http://localhost:4000/admin/courses/${courseId}`;

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
        <div className='batch'>
            <div className='batch__desTrainee'>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <h3>Topics are</h3>
                <ol >
                    {topicList}
                </ol>
                <p>Start-date: {course.startDate}</p>
                <p>End-date: {course.endDate}</p>
            </div>

        </div>
    )
}

export default CourseDetails