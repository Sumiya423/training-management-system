import React from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";


export const Login = () => {

  const { dispatch } = React.useContext(AuthContext)

  let navigate = useNavigate();

  const dataState = {
    email: "",
    password: "",
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
        if (res.ok) return res.json();
        throw res;
      })
      .then(resJson => {
        dispatch({
          type: "LOGIN",
          payload: resJson.results
        })
        if(resJson.results.user.isAdmin){
          navigate('/admin/courses')
        }
        navigate('/courses')
        
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
    <div className="loginpage">
      <div className="loginpage__container">
        <h2 className="loginpage__container__heading__bjit"> BJIT Training Center</h2>

        <div className="loginpage__container__form__section">
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={data.email}

              required
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value
                });

                if (!e) {
                  e.target.style.border = "2px solid red"
                  document.getElementById('erroremail').innerHTML = "Email is required";
                }
                if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value)) {
                  e.target.style.border = ""
                  document.getElementById('erroremail').innerHTML = "";
                } else {
                  e.target.style.border = "2px solid red"
                  document.getElementById('erroremail').innerHTML = "This is an invalid email";
                }
              }}
            />

            <span style={{ color: "red" }} id="erroremail"></span>


            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              required
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value
                });

                if (e.target.value.length > 5) {
                  e.target.style.border = ""
                  document.getElementById('errorpass').innerHTML = "";
                } else {
                  e.target.style.border = "2px solid red"
                  document.getElementById('errorpass').innerHTML = "Password should contain min 6 character!";
                }

              }}
            />
            <span style={{ color: "red" }} id="errorpass"></span>

            {data.errorMessage && <span>{data.errorMessage}</span>}
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? "Loading....." : "Login"}
            </button>
          </form>
        </div>

      </div>
    </div>

  );
};
export default Login;