import React from "react";
import { AuthContext } from "../../App";

export const CreateTrainee = () => {

  const initialData = {
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialData);
  const [selectedFile, setSelectedFile] = React.useState();
  const { state: authState } = React.useContext(AuthContext)

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

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("imageUrl", selectedFile);

    const url = "http://localhost:4000/admin/create-user"
    fetch(url, {
      method: "post",
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
      <form className="list" onSubmit={handleSubmit}>
        <h1 className="list__header">Create Trainee</h1>
        <hr className="list__hr"></hr>

        <div className="list__form">
          <div className="list__form__input">
          <p>Name</p>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleInputChange}
            />
          </div>

          <div className="list__form__input">
          <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
          </div >
          <div className="list__form__input">
          <p>Image</p>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
          {data.errorMessage && <span>{data.errorMessage}</span>}
          <button disabled={data.isSubmitting}>
            {data.isSubmitting ? "Creating....." : "Create"}
          </button>
        </div>

      </form>
    </div>
  );
};
export default CreateTrainee;
