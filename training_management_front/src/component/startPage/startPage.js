import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../../service/authUser';

export default function StartPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const navigate = useNavigate();

    

    const loginHandler = (event) => {
        event.preventDefault();
        console.log({
            email, password
        });
        fetch("http://localhost:4000/signin", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                "Accept": "*/*"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log(data)
                    const user = {
                        token: data.results.access_token,
                        username: data.results.name,
                        isAdmin: data.results.isAdmin,
                        isTrainer: data.results.isTrainer,
                        isVerified: data.results.isVerified
                    }
                    setToken(user)
                    navigate(`/profile/`)
                    window.location.reload(false);
                } else {
                    setErrorMail(data.message)
                    console.log(data)
                    return data;
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='startpage__container'>
            <h2 className="startpage__container__heading__section"> BJIT Training Center</h2>

            <div className="startpage__container__login__section">
                <h2>Login</h2>
                <form onSubmit={loginHandler} className='startpage__container__login__section__form'>
                    <p>
                        <label>Email</label>
                        <br />
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={(e) => {
                                if (!e) {
                                    e.target.style.border = "2px solid red"
                                    document.getElementById('erroremail').innerHTML = "Email is required";
                                }
                                if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value)) {
                                    setEmail(e.target.value);
                                    e.target.style.border = ""
                                    document.getElementById('erroremail').innerHTML = "";
                                } else {
                                    e.target.style.border = "2px solid red"
                                    document.getElementById('erroremail').innerHTML = "This is an invalid email";
                                }
                            }}
                        />
                        <br />
                        <span style={{ color: "red" }} id="erroremail"></span>
                    </p>


                    <p>
                        <label>Password</label>
                        <Link to="/change-password"><label className="startpage__container__login__section__form__forget__label">Forget password?</label></Link>
                        <br />
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={(e) => {
                                if (e.target.value.length > 5) {
                                    setPassword(e.target.value);
                                    e.target.style.border = ""
                                    document.getElementById('errorpass').innerHTML = "";
                                } else {
                                    e.target.style.border = "2px solid red"
                                    document.getElementById('errorpass').innerHTML = "Password should contain min 6 character!";
                                }

                            }}
                        />
                        <br />
                        <span style={{ color: "red" }} id="errorpass"></span>
                    </p>

                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                    {errorMail && <div style={{ color: 'red' }} >{errorMail}</div>}
                </form>

            </div>
        </div>
    )
}