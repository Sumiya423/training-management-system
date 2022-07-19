import React from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";

function ForgetPassword() {
    let navigate = useNavigate();

    const [email, setEmail] = React.useState();

    const forgetPasswordHandler = (event) => {
        event.preventDefault();
        console.log({
          email: email,
        });
        fetch("http://localhost:4000/send-reset-password-mail", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <div className="loginpage">
            <div className="loginpage__container">
                <h2 className="loginpage__container__heading__bjit"> Reset your password</h2>
                <p>Enter your email address and we will send you a mail !</p>
                <div className="loginpage__container__form__section">
                    <form className="loginpage__container__form__section__form" onSubmit={forgetPasswordHandler}>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter your email"
                            value={email}

                            required
                            onChange={(e) => {

                                setEmail(e.target.value);

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

                        <div className="loginpage__container__form__section__form__button">
                            <button disabled={''}>
                                {"Submit"}
                            </button>
                            <p>
                                <Link to="/">Back to Homepage.</Link>
                            </p>
                        </div>
                        {/* {data.errorMessage && <span style={{ color: "red" }}>{data.errorMessage + ". Enter correct info to login!"}</span>} */}

                    </form>


                </div>

            </div>
        </div>
    );
};
export default ForgetPassword;