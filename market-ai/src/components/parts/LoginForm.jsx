import React from 'react'
import Axios from "axios"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useNavigate();




    const login = async (e) => {
        // e.preventDefault()
        Axios.post('http://localhost:3001/api/login', {
            username: userName,
            password: password
        }).then(async (response) => {
            console.log(response.data.username)
            if (response.data.username === undefined || response.data.password === undefined) {
                console.log('if');
                setError('Username and/or Password is incorrect')

            } else {
                console.log('else');
                history("/search");
            }



        })

    }

    //not working yet



    return (
        <div>
            <div className="form">
                <h3>Login To Your Account</h3>
                {/* <form > */}
                {error ? [error].map(e =>

                    <p className="error-msg">{e}</p>
                    // <p>hello world</p>

                ) : <div></div>}
                <p>
                    <label htmlFor="user">Enter Username: </label>
                </p>
                <input type="text" id="user" onChange={(e) => {
                    setUsername(e.target.value)
                }} />

                <p>
                    <label htmlFor="pass">Enter Password: </label>
                </p>
                <input type="password" id="pass" onChange={(e) => {
                    setPassword(e.target.value)
                }} />

                <p>
                    <button onClick={login}>Login</button>
                </p>

                <p>
                    Don't have an account?
                </p>
                <p>
                    <a href="/">Sign Up</a>
                </p>
                {/* </form> */}
            </div>
        </div>
    )
}

export default LoginForm
