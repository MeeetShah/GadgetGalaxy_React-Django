import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
     const navigate = useNavigate()
   
    

    


    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(apis.signupapi, {
                username: username,
                password: password,
                email: email
            });

            setMessage(`Signup successful. Token: ${response.data.token}`);
        } catch (error) {
            if (error.response) {
                setMessage(`Error: ${error.response.data.error}`);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    const Gotologin = () =>{
        navigate("/login")
    }


    return (
        <>


            <section className="vh-100 bg-image"
                style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form onSubmit={handleSignup}>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="name">Your Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => { setUsername(e.target.value) }}

                                                />

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">Your Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => { setEmail(e.target.value) }}

                                                />

                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) => { setPassword(e.target.value) }}

                                                />

                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Signup</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" onClick={Gotologin} className="fw-bold text-body"><u>Login here</u></a></p>

                                        </form>
                                        {message && <p>{message}</p>}

                                     

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    );
};

export default Signup;
