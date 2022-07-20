import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import BatchCard from './batchCard';
import { AuthContext } from '../../App';

function BatchList() {

    const [batches, setBatches] = useState([])
    const [filterdbatches, setFilteredBatches] = useState([])
    const { state: authState } = React.useContext(AuthContext)

    let navigate = useNavigate();


    useEffect(() => {
        const url = `http://localhost:4000/admin/batches`;

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
                setBatches(json.results);
                setFilteredBatches(json.results);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [])


    const getBatchStatus = (batch) => {
        const today = new Date()
        const start = new Date(batch.startDate)
        const end = new Date(batch.endDate)
        if (today > start && today < end){
            return "Ongoing"
        } else if (today < start) {
            return "Upcomming"
        } else {
            return "Finished"
        }
    }


    const handleClick = (event, batch_id) => {
        console.log(batch_id);
        navigate(`/admin/batches/${batch_id}`);
    }

    const batchList = filterdbatches?.map(batch => <BatchCard key={batch._id} batch={batch} batchStatus={getBatchStatus(batch)} onClick={handleClick} />)

    return (
        <div className='list'>
            <h2 className='list__header'>Batches</h2>
            <div className='list__on_up'>
                <button onClick={(e) => setFilteredBatches(batches.filter(batch => getBatchStatus(batch) === "Finished"))}>Finished</button>
                <button onClick={(e) => setFilteredBatches(batches.filter(batch => getBatchStatus(batch) === "Ongoing"))}>Ongoing</button>
                <button onClick={(e) => setFilteredBatches(batches.filter(batch => getBatchStatus(batch) === "Upcomming"))}>Upcoming</button>
                <button onClick={(e) => setFilteredBatches(batches)}>All Batches</button>
            </div>
            <hr className='list__hr'></hr>
            {authState.user.isAdmin && <Link to='/admin/batches/create' className='list__create-batch'>Create Batch</Link>}
            <div className='list__batch'>
                {batchList}
            </div>

        </div>
    )
}

export default BatchList;