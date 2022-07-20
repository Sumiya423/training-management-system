import React from "react";
import { AuthContext } from "../../App";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";


function CreateCourse() {
    const navigate = useNavigate()

    const initialData = {
        isSubmitting: false,
        errorMessage: null
    };

    const { state: authState } = React.useContext(AuthContext)
    const [data, setData] = React.useState(initialData);
    const [trainees] = [
        'OOP',
        'ReactJS',
        'Express',
        'NodeJS',
        'MongoDB',
        'MySQL',
        'SpringBoot',
        'CSS',
        'HTML',
        'SCSS',
        'DOM',
        'HOC',
        'Element',
        'EventListener'
    ]


    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
        let payload = {
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            trainees: data.trainees.map(trainee => trainee._id),
            courses: data.courses.map(course => course._id)
        }

        const url = `http://localhost:4000/admin/create-batch`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + authState.token,
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                if (res.ok) return res.json();
                throw res;
            })
            .then(resJson => {
                console.log(resJson)
                navigate('/admin/batches')
            })
            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error.message || error.statusText
                });
            });
    };

    return (
        <div className="container">
            <div>
                <form className="list" onSubmit={handleSubmit}>
                    <h1 className="list__header">Create Course</h1>
                    <hr className="list__hr"></hr>
                    <div className="list__form">
                        <div className="list__form__input">
                            <p>Title</p>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                defaultValue={data.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="list__form__input">
                            <p>Description</p>
                            <textarea
                                type="text"
                                name="description"
                                placeholder="Descriptions"
                                defaultValue={data.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="list__form__input">
                            <p>Start-Date</p>
                            <input
                                type="date"
                                name="startDate"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="list__form__input">
                            <p>End-Date</p>
                            <input
                                type="date"
                                name="endDate"
                                // defaultValue={new Date().toISOString().substring(0, 10)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="list__form__input">
                            <p>Select Topics</p>
                            <Select
                                width='200px'
                                name="trainees"
                                closeMenuOnSelect={false}
                                isMulti
                                options={trainees}
                                onChange={(selected) => setData({
                                    ...data,
                                    ['trainees']: selected
                                })}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option._id}
                            />
                        </div>

                        {data.errorMessage && <span>{data.errorMessage}</span>}
                        <button disabled={data.isSubmitting}>
                            {data.isSubmitting ? "Creating....." : "Create"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreateCourse;
