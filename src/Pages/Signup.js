import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SIGNUP_ENDPOINT } from '../env';
import { ButtonGroup, ToggleButton } from "react-bootstrap";

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState();
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    let confirmPass = false
    let navigate = useNavigate()
    const user = useSelector(state => state.user)
    const radios = [
        { name: 'Seller', value: 'seller' },
        { name: 'Buyer', value: 'buyer' },
    ];

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
        const data = {
            email, password, name, type
        }
        // console.log(data);
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
        } else if (type === '') {
            Swal.fire({
                title: `unspecified user type`,
                showCancelButton: false
            })
        } else {
            axios.post(SIGNUP_ENDPOINT, data, { headers: headers })
                .then(json => {
                    // const data = json.data
                    // console.log(json);
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
                    <input type="email" className="form-control" id="Email" placeholder="Your email" aria-describedby="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name" placeholder="Your name" aria-describedby="Name" onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" placeholder="Your password" aria-describedby="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="ConfirmPassword" placeholder="Confirm your password" aria-describedby="ConfirmPassword" onChange={(e) => { confirmPassword(e.target.value) }} />
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
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </>
    )
}

export default Signup;