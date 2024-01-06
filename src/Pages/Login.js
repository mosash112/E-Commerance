import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { storeUser } from '../rtk/slices/auth-slice';
import { LOGIN_ENDPOINT } from '../env';
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Swal from "sweetalert2";

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [type, setType] = useState('');
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const radios = [
        { name: 'Seller', value: 'seller' },
        { name: 'Buyer', value: 'buyer' },
    ];

    const formSubmit = (e) => {
        e.preventDefault();
        console.log("form submited");
        const headers = {
            'Authorization': 'Bearer ' + user.token,
            // 'Content-Type': 'application/json'
        }
        const product = {
            email, password, type
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
        } else if (type === '') {
            Swal.fire({
                title: `unspecified user type`,
                showCancelButton: false
            })
        } else {
            axios.post(LOGIN_ENDPOINT, product, { headers: headers })
                .then(json => {
                    const data = json.data
                    dispatch(storeUser(data))
                    console.log(`welcome ${data.user.name}`);
                    navigate('/')
                });
        }
    }


    return (
        <>
            <h1>Log in</h1>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Email" placeholder="Email" aria-describedby="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder="Password" aria-describedby="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <ButtonGroup className="mb-3">
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="outline-primary"
                            name="radio"
                            value={radio.value}
                            checked={type === radio.value}
                            onChange={(e) => setType(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup><br />
                <button type="submit" className="btn btn-primary">Log in</button>
            </form><br />
            <p>doesn't have an account? {<Link to='/signup' variant="primary">Sign up</Link>}</p>
        </>
    )
}

export default Login;