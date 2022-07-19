import React from "react";
import { AuthContext } from "../../App";
import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";


function EditBatch() {
  const navigate = useNavigate()

  const initialData = {
    isSubmitting: false,
    errorMessage: null
  };

  const { state: authState } = React.useContext(AuthContext)
  const [trainees, setTrainees] = React.useState({})
  const [courses, setCourses] = React.useState({})
  const [data, setData] = React.useState(initialData);
  const [batch, setBatch] = React.useState({})

  const {batchId} = useParams()


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
    const fetchBatchData = async () => {
        const url = `http://localhost:4000/admin/batches/${batchId}`
        try {
          const response = await fetch(url,
            {
              method: "GET",
              headers: {
                'authorization': 'Bearer ' + authState.token,
              },
            });
          const json = await response.json();
          setBatch(json.results);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchBatchData()
  
  }, [])

  const handleInputChange = event => {
    setBatch({
      ...batch,
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
      title: batch.title,
      description: batch.description,
      startDate: batch.startDate,
      endDate: batch.endDate,
      trainees: batch.trainees.map(trainee => trainee._id),
      courses: batch.courses.map(course => course._id)
    }
    console.log(payload)
    const url = `http://localhost:4000/admin/edit-batch/${batchId}`
    fetch(url, {
      method: 'put',
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
      <form onSubmit={handleSubmit}>
        <h1>Create Batch</h1>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={batch.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            name="description"
            placeholder="Descriptions"
            defaultValue={batch.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {batch.startDate && <input
            type="date"
            name="startDate"
            defaultValue={JSON.stringify(new Date(batch.startDate)).slice(1,11)}
            onChange={handleInputChange}
          />}
        </div>
        <div>
          {batch.endDate && <input
            type="date"
            name="endDate"
            defaultValue={JSON.stringify(new Date(batch.endDate)).slice(1,11)}
            onChange={handleInputChange}
          />}
        </div>
        <div>
          {batch.trainees && <Select
            name="trainees"
            closeMenuOnSelect={false}
            isMulti
            options={trainees}
            defaultValue={batch.trainees}
            onChange={(selected) => setBatch({
              ...batch,
              ['trainees']: selected
            })}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
          />}
        </div>
        <div>
          {batch.courses && <Select
            name="courses"
            closeMenuOnSelect={false}
            isMulti
            defaultValue={batch.courses}
            options={courses}
            onChange={(selected) => setBatch({
              ...batch,
              ['courses']: selected
            })}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
          />}
        </div>
        {data.errorMessage && <span>{data.errorMessage}</span>}
        <button disabled={data.isSubmitting}>
          {data.isSubmitting ? "Creating....." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default EditBatch;
