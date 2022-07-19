import React from "react";
import { AuthContext } from "../../App";
import Select from 'react-select';


export const EditProfile = () => {

  const initialData = {
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialData);
  const [user, setUser] = React.useState({})
  const [selectedFile, setSelectedFile] = React.useState();


  const [courses, setCourses] = React.useState()
  const { state: authState } = React.useContext(AuthContext)

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
    const fetchTrainerData = async () => {
      const url = `http://localhost:4000/admin/users/${authState.user._id}`
      try {
        const response = await fetch(url,
          {
            method: "GET",
            headers: {
              'authorization': 'Bearer ' + authState.token,
            },
          });
        const json = await response.json();
        const trainer_data = json.results
        setUser(trainer_data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTrainerData()
  }, [])

  const handleInputChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  const handleMultiSelect = selected => {
    setUser({
      ...user,
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
    const course_ids = user.courses?.map(course => course._id)
    let formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("about", user.about);
    selectedFile?formData.append("imageUrl", selectedFile):formData.append("imageUrl", user.imageUrl);
    formData.append("isTrainer", user.isTrainer);
    formData.append("courses", course_ids)
    
    console.log(...formData)
    const url = `http://localhost:4000/admin/edit-user/${authState.user._id}`
    fetch(url, {
      method: "put",
      headers: {
        'authorization': 'Bearer ' + authState.token,
      },
      body: formData
    })
      .then(res => {
        if (res.ok) return res.json();
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
        <h1>Edit Profile</h1>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            defaultValue={user.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="email"
            defaultValue={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <textarea
            name="about"
            placeholder="about"
            defaultValue={user.about}
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
          {user.courses && user.isTrainer && <Select
            closeMenuOnSelect={false}
            isMulti
            defaultValue={user.courses}
            options={courses}
            onChange={handleMultiSelect}
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
};
export default EditProfile;
