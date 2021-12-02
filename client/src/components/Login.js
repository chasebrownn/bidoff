import React, {Component, Fragment, useState} from "react";
import { Outlet, Link } from "react-router-dom";
import './Login.css';

export default function Login({setToken}) {// take in set token here
    const [creds, setCreds] = useState({
        email: '',
        password: ''
    });
    function handleValueChange(evt) {
        const value = evt.target.value
        setCreds({
            ...creds,
            [evt.target.name]: value
        })
    }
    const onSubmitForm = async (e) => {
        console.log("Submit " + creds.email + " " + creds.password)
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/user_auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(creds)
            });
            const token = await response.text()
            
            if (response.status == 200){
                // give token to website
                setToken(token)
                window.location = "/dashboard";
            } else {
                alert(token)
            }
            // window.location = "/"; //once a response has been sent, it refreshes
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <div className="container">
            <div className="login-card rounded">
                <div className="container text-center App">
                    <div className="text-left">
                        <form onSubmit={onSubmitForm}>
                            <div className="title">
                                <h2 className="text-center font-weight-bold">Sign In</h2>
                            </div>

                            <p className="text-muted text-center">Welcome to BidOff. If you have an account please sign in, otherwise sign up at the link below</p>

                            <div className="form-group">
                                <label className="font-weight-bold">Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" name='email' onChange={handleValueChange}/>
                            </div>

                            <div className="form-group">
                                <label className="font-weight-bold">Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" name='password' onChange={handleValueChange}/>
                            </div>

                            {/* <Link to="/dashboard" > */}
                            <button type="submit" className="btn btn-primary btn-block submit-button">Submit</button>
                            {/* </Link>                                */}
                            <div className="sign-up-prompt">
                                <p className="text-center">
                                    Need to Make an Account? <Link to="/register">Sign Up Here</Link>
                                </p>
                            </div>                  
                        </form>
                    </div>
                </div>
            </div>     
        </div>
    );
    
}

