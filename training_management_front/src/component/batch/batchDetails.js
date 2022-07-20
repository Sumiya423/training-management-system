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

    const { state: authState } = React.useContext(AuthContext)
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
    const courseList = batch.courses?.map(course => <BatchCourse key={course._id} course={course} />)
    return (
        <div className='batch'>
            <div className='batch__desTrainee'>
                <h2 className='batch__title'>{batch.title}</h2>
                <p className='batch__des'>{batch.description}</p>
                <div className='batch__trainee'>
                    <h3>Trainees are</h3>
                    <div className='batch__trainee__container'>

                        {traineesList}
                    </div>

                </div>
            </div>
            <div className="batch__course">
                <h3>Courses are</h3>

                <div className='batch__course__container'>
                    {courseList}
                </div>

                <h3>Batch Status</h3>
                <p><span>Start-date:</span> {new Date(batch.startDate).toLocaleDateString()}</p>
                <p><span>End-date:</span> {new Date(batch.endDate).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default BatchDetails