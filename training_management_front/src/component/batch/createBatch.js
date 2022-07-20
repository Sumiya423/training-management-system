import React from "react";
import { AuthContext } from "../../App";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";


function CreateBatch() {
  const navigate = useNavigate()

  const initialData = {
    isSubmitting: false,
    errorMessage: null
  };

  const { state: authState } = React.useContext(AuthContext)
  const [trainees, setTrainees] = React.useState({})
  const [courses, setCourses] = React.useState({})
  const [data, setData] = React.useState(initialData);



  React.useEffect(() => {
    const url = `http://localhost:4000/admin/courses`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'authorization': 'Bearer ' + authState.token,
          },
        });
        const json = await response.json();
        setCourses(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData()
    const fetchTraineeData = async () => {
      const url = `http://localhost:4000/admin/users`
      try {
        const response = await fetch(url,
          {
            method: "GET",
            headers: {
              'authorization': 'Bearer ' + authState.token,
            },
          });
        const json = await response.json();
        setTrainees(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTraineeData()
  }, [])


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
          <h1 className="list__header">Create Batch</h1>
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
              <p>Select Trainees</p>
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
            <div className="list__form__input">
              <p>Select Courses</p>
              <Select
                name="courses"
                closeMenuOnSelect={false}
                isMulti
                options={courses}
                onChange={(selected) => setData({
                  ...data,
                  ['courses']: selected
                })}
                getOptionLabel={(option) => option.title}
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

export default CreateBatch;
