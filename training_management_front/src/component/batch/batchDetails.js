import React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../App';
import UserCard from '../user/userCard';
import { useNavigate } from "react-router-dom";
import BatchCourse from './batchCourse';

function BatchDetails() {

    const [batch, setBatch] = useState([])
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
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [])

    const handleTraineesClick = (event, batch_id) => {
    }
    const traineesList = batch.trainees?.map(trainee => <UserCard key={trainee._id} component={trainee} onClick={handleTraineesClick} />)
    const courseList = batch.courses?.map(course => <BatchCourse key={course._id} course={course}/>)
    return (
        <div>
            <h3>Title: {batch.title}</h3>
            <p>Desc: {batch.description}</p>
            Trainees:
            {traineesList}
            Courses:
            {courseList}
            <p>Start-date: {new Date(batch.startDate).toLocaleDateString()}</p>

            <p>End-date: {new Date(batch.endDate).toLocaleDateString()}</p>
        </div>
    )
}

export default BatchDetails