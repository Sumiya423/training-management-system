import React from "react";
import { AuthContext } from "../../App";
import Select from 'react-select';


export const CreateTrainer = () => {

  const initialData = {
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialData);
  const [selectedFile, setSelectedFile] = React.useState();


  const [courses, setCourses] = React.useState([])
  const {state: authState} = React.useContext(AuthContext)

  React.useEffect( () => {
      const url = `http://localhost:4000/admin/courses`;

      const fetchData = async () => {
          try {
              const response = await fetch(url);
              const json = await response.json();
              let courseOptions = []
              json.results.map(course => courseOptions.push({value: course._id, label: course.title}))
              setCourses(courseOptions);
          } catch (error) {
              console.log("error", error);
          }
      };
      fetchData()
  }, [])

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
  const handleMultiSelect = selected => {
    setData({
      ...data,
      ['courses']: selected
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    const course_ids = data.courses?.map(course => course.value)
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("imageUrl", selectedFile);
    formData.append("isTrainer", true);
    formData.append("courses", course_ids)
  
    const url = "http://localhost:4000/admin/create-user"
    fetch(url, {
      method: "post",
      body: formData
    })
    .then(res => {
      if(res.ok) return res.json();
      throw res;
    })
    .then(resJson => {
      console.log(resJson)
      // navigate('/admin/courses')
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
        <h1>Create Trainer</h1>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
        <div>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={courses}
            onChange={handleMultiSelect}
          />
        </div>
        {data.errorMessage && <span>{data.errorMessage}</span>}
        <button disabled={data.isSubmitting}>
          {data.isSubmitting ? "Creating....." : "Create"}
        </button>
      </form>
    </div>
  );
};
export default CreateTrainer;
