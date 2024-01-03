import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from '../rtk/slices/auth-slice';
import { Button } from "react-bootstrap";
import { url } from '../env.json';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const api_url = 'https://my-store-api-eipk.onrender.com/users/login'
    const user = useSelector(state => state.user)

    const emailHandler = (value) => {
        setEmail(value)
    }

    const passwordHandler = (value) => {
        setPassword(value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        const headers = {
            'Authorization': 'Bearer ' + user.token,
            // 'Content-Type': 'application/json'
        }
        const product = {
            email, password
        }
        axios.post(api_url, product, { headers: headers })
            .then(json => {
                const data = json.data
                dispatch(storeUser(data))
                console.log(`welcome ${data.user.name}`);
                navigate('/')
            });
    }


    return (
        <>
            <h1>Log in</h1>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Email" placeholder="Email" aria-describedby="Email" onChange={(e) => { emailHandler(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder="Password" aria-describedby="Password" onChange={(e) => { passwordHandler(e.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
            <p>doesn't have an account? {<Button variant="primary" onClick={() => navigate('/signup')}>Sign up</Button>}</p>
        </>
    )
}

export default Login;