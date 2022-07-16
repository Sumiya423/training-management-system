import React from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";


export const Login = () => {

  const {dispatch} = React.useContext(AuthContext)

  let navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

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

    const url = "http://localhost:4000/signin"
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    .then(res => {
      if(res.ok) return res.json();
      throw res;
    })
    .then(resJson => {
      dispatch({
        type: "LOGIN",
        payload: resJson.results
      })
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
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text" 
          name="email"
          placeholder="email"
          value={data.email} 
          onChange={handleInputChange}
        />
        <input
         type="password"
          name="password"
          placeholder="password"
          value={data.password} 
          onChange={handleInputChange}
        />
        {data.errorMessage && <span>{data.errorMessage}</span>}
        <button disabled={data.isSubmitting}>
          {data.isSubmitting ? "Loading.....": "Login"}
        </button>
      </form>
    </div>
  );
};
export default Login;