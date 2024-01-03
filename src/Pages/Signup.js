import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from '../rtk/slices/auth-slice';
import Swal from "sweetalert2";
import { url } from '../env.json';

function Signup() {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    let confirmPass = false
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const api_url = url + 'users/signup'
    const user = useSelector(state => state.user)

    const emailHandler = (value) => {
        setEmail(value)
    }

    const nameHandler = (value) => {
        setName(value)
    }

    const passwordHandler = (value) => {
        setPassword(value)
    }

    const confirmPassword = (value) => {
        if (value === password) {
            confirmPass = true
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        const headers = {
            'Authorization': 'Bearer ' + user.token,
            // 'Content-Type': 'application/json'
        }
        const product = {
            email, password, name
        }
        if (email === '') {
            Swal.fire({
                title: `Empty email address`,
                text: 'please enter a valid email adress',
                showCancelButton: false
            })
        } else if (password === '') {
            Swal.fire({
                title: `Empty password`,
                text: 'please enter a password',
                showCancelButton: false
            })
        } else if (!confirmPass) {
            Swal.fire({
                title: `unmatching password`,
                showCancelButton: false
            })
        } else {
            axios.post(api_url, product, { headers: headers })
                .then(json => {
                    const data = json.data
                    // dispatch(storeUser(data))
                    // console.log(`welcome ${data.user.name}`);
                    console.log(json);
                    navigate('/login')
                });
        }
    }

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Email" placeholder="Your email" aria-describedby="Email" onChange={(e) => { emailHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" placeholder="Your name" aria-describedby="Name" onChange={(e) => { nameHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder="Your password" aria-describedby="Password" onChange={(e) => { passwordHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="ConfirmPassword" placeholder="Confirm your password" aria-describedby="ConfirmPassword" onChange={(e) => { confirmPassword(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </>
    )
}

export default Signup;