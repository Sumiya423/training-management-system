import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';


function BatchCard({ batch, onClick }) {
    const { state: authState } = React.useContext(AuthContext)

    let navigate = useNavigate();
    const editBatch = (e) => {
        const clicked_div = e.currentTarget;
        const selected_course_id = clicked_div.id
        navigate(`/edit-batch/${selected_course_id}`)
    }
    const deleteBatch = (e) => {
        const clicked_div = e.currentTarget;
        const selected_course_id = clicked_div.id;
        console.log(selected_course_id)
        fetch(`http://localhost:4000/admin/delete-batch/${selected_course_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + authState.token,
            },

        })
            .then((res) => {
                console.log(res);
                console.log(res.status);
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            <div style={{ backgroundColor: 'lightBlue', display: 'flex', flexDirection: 'column', margin: '50px' }} onClick={event => onClick(event, batch._id)}>
                <p>Title: {batch.title}</p>
                <span>Desc: {batch.description}</span>
            </div>
            <div>
                <button id={batch._id} onClick={editBatch}>Edit</button>
                <button id={batch._id} onClick={deleteBatch}>Delete</button>
            </div>
        </div>

    )
}

export default BatchCard;