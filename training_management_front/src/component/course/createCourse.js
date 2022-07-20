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
    const topics = [
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
    let topicOptions = []
    topics.map(topic => topicOptions.push({ 'label': topic, 'value': topic }))


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
            endDate:data.endDate,
            topics: data.topics.map(topic => topic.value)
        }

        const url = `http://127.0.0.1:4000/admin/create-course`

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
                navigate('/admin/courses')
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
                                name="topics"
                                closeMenuOnSelect={false}
                                isMulti
                                options={topicOptions}
                                onChange={(selected) => setData({
                                    ...data,
                                    ['topics']: selected
                                })}
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
