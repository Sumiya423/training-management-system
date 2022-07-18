import React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../App';
import UserCard from '../user/userCard';
import { useNavigate } from "react-router-dom";


function BatchDetails() {

    const [batch, setBatch] = useState([])
    const [courses, setCourses] = useState([])
    const [trainees, setTrainees] = useState([])
    const { batchId } = useParams();

    const {state: authState} = React.useContext(AuthContext)
    let navigate = useNavigate();

    useEffect(() => {

        const url = `http://localhost:4000/admin/batches/${batchId}`;

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
                setBatch(json.results);
                setCourses(json.results.courses);
                setTrainees(json.results.trainees);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [])

    const handleCourseClick = (event, course_id) => {
        console.log(course_id);
        navigate(`/admin/courses/${course_id}`);
    }

    const handleTraineesClick = (event, batch_id) => {

    }
    const courseList = courses;
    const traineesList = trainees?.map(trainees => <UserCard key={trainees._id} component={trainees} onClick={handleTraineesClick} />)
    return (
        <div>
            <h3>Title: {batch.title}</h3>
            <p>Desc: {batch.description}</p>
            Trainees:
            <ol>
                {traineesList}
            </ol>
            Courses:
            <ol>
                { }
            </ol>
            <p>Start-date: {batch.startDate}</p>

            <p>End-date: {batch.endDate}</p>
        </div>
    )
}

export default BatchDetails