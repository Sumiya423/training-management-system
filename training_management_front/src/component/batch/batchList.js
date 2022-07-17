import React from 'react';
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import BatchCard from './batchCard';
import { AuthContext } from '../../App';

function BatchList() {

    const [batches, setBatches] = useState([])
    const {state: authState} = React.useContext(AuthContext)
    
    let navigate = useNavigate();


    useEffect( () => {
        const url = `http://localhost:4000/admin/batches`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
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

    const batchList = batches?.map(batch => <BatchCard key={batch._id} batch={batch} onClick={handleClick}/>)

    return (
        <div>
            {batchList}
        </div>
    )
}

export default BatchList;