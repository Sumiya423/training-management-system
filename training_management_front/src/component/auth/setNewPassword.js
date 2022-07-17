import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

function SetNewPassword() {
  let navigate = useNavigate();
  let { token, user_id } = useParams()

  const dataState = {
    password: "",
    confirmPassword: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(dataState);

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
    console.log(data)
    if (data.password === data.confirmPassword) {
      const url = `http://localhost:4000/change-password/${token}/${user_id}`
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: data.password
        })
      })
      .then(res => {
        if(res.ok) return res.json();
        throw res;
      })
      .then(resJson => {

        navigate('/signin')
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
    } else {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: "Password is not same."
      });
    }
  };



  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Set New Password</h1>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          onChange={handleInputChange}
        />
        {data.errorMessage && <span>{data.errorMessage}</span>}
        <button disabled={data.isSubmitting}>
          {data.isSubmitting ? "Loading....." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default SetNewPassword