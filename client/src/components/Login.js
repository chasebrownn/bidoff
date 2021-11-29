import React, {Component, Fragment, useState} from "react";
import { Outlet, Link } from "react-router-dom";
import './Login.css';

export default class Login extends Component{
    render() {
        return (
            <div className="container">
                <div className="login-card rounded">
                    <div className="container text-center App">
                        <div className="text-left">
                            <form>
                                <div className="title">
                                    <h2 className="text-center font-weight-bold">Sign In</h2>
                                </div>

                                <p className="text-muted text-center">Welcome to BidOff. If you have an account please sign in, otherwise sign up at the link below</p>

                                <div className="form-group">
                                    <label className="font-weight-bold">Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email" />
                                </div>

                                <div className="form-group">
                                    <label className="font-weight-bold">Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" />
                                </div>

                                <Link to="/dashboard" >
                                <button type="submit" className="btn btn-primary btn-block submit-button">Submit</button>
                                </Link>                               
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
}