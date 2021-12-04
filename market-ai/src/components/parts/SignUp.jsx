import React from 'react'
import Axios from "axios"
import { useEffect, useState } from 'react'
const SignUp = () => {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const signup = () => {
        Axios.post('http://localhost:3001/api/signup', {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName,
            password: password
        }).then(() => {
            alert('signup worked')
        })
    }
    return (
        <div>
            <div className="form">
                <h3>Register Into Your Account </h3>
                <p >
                    Password field must contain 8 or more characters
                </p>

                <p>
                    Must have at least one number
                </p>

                <p>
                    must have at lease one uppercase
                </p>
                <p>

                    must have at least lowercase letter:

                </p>
                <form action="search" onSubmit={signup}>
                    <p>
                        <label htmlFor="firstname">Enter First Name:</label>
                    </p>
                    <input type="text" id="firstname" onChange={(e) => {
                        setFirstname(e.target.value)
                    }} required />

                    <p>
                        <label htmlFor="lastname">Enter Last Name:</label>
                    </p>
                    <input type="text" id="lastname" onChange={(e) => {
                        setLastname(e.target.value)
                    }} required />

                    <p>
                        <label htmlFor="email">Enter Email Address: </label>
                    </p>
                    <input type="email" id="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} required />
                    <p>
                        <label htmlFor="user">Enter Username: </label>
                    </p>
                    <input type="text" id="user" onChange={(e) => {
                        setUsername(e.target.value)
                    }} required />

                    <p>
                        <label htmlFor="pass">Enter Password: </label>
                    </p>
                    <input type="password" id="pass" onChange={(e) => {
                        setPassword(e.target.value)
                    }} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />

                    <p>
                        <button>Sign Up</button>
                    </p>
                </form>
                <p>Already have an account?</p>
                <p><a href="login">Login</a></p>
            </div>
        </div>
    )
}

export default SignUp
