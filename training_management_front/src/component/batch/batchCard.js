import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';


function BatchCard({ batch, onClick }) {
    const { state: authState } = React.useContext(AuthContext)

    let navigate = useNavigate();
    const editBatch = (e) => {
        const clicked_div = e.currentTarget;
        const selected_course_id = clicked_div.id
        navigate(`/admin/batches/${selected_course_id}/edit`)
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
        <div className='list__batch__container'>
            <div className='list__batch__container__body' onClick={event => onClick(event, batch._id)}>
                <h2 className='list__batch__container__title'> {batch.title}</h2>
                <p className='list__batch__container__des'>{(batch.description).slice(0, 200)}<span style={{fontWeight:'bold'}}>...</span></p>
                <p className='list__batch__container__des'><span>Start-Date:</span> {JSON.stringify(new Date(batch.startDate)).slice(1,11)}</p>
                <p className='list__batch__container__des'><span>End-Date:</span> {JSON.stringify(new Date(batch.endDate)).slice(1,11)}</p>
            </div>
            {authState.user.isAdmin && <div>
                <button className='list__batch__container__btn edit' id={batch._id} onClick={editBatch}>Edit</button>
                <button className='list__batch__container__btn delete' id={batch._id} onClick={deleteBatch}>Delete</button>
            </div>}
        </div>
    )
}

export default BatchCard;