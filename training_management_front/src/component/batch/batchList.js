import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import BatchCard from './batchCard';
import { AuthContext } from '../../App';

function BatchList() {

    const [batches, setBatches] = useState([])
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
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [])

    const handleClick = (event, batch_id) => {
        console.log(batch_id);
        navigate(`/admin/batches/${batch_id}`);
    }

    const batchList = batches?.map(batch => <BatchCard key={batch._id} batch={batch} onClick={handleClick} />)

    return (
        <div className='list'>
            <h2 className='list__header'>Batches</h2>
            <div className='list__on_up'>
                <Link to=''>Old</Link>
                <Link to=''>Ongoing</Link>
                <Link to=''>Upcoming</Link>
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