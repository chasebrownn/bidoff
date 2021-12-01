import React, {Fragment, useState} from "react";
import { Outlet, Link } from "react-router-dom";
import "./Login.css";

const Register = () => {
    const [user, setUser] = useState({
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        email_verified: '',
        phone_number: '',
        phone_number_verified: '',
        address: ''
    });
    function handleValueChange(evt){
        const value = evt.target.value
        setUser({
            ...user,
            [evt.target.name]: value
        })
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // const body = { user };

            // console.log("BODY:")
            // console.log(body)
            console.log("SUBMIT REGISTER")

            const response = await fetch ("http://localhost:5000/user", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });
            
            if (response.status != 200) {
                // failed to register, inform user
                alert(await response.text());
                
                
                // alert(response.json())
            } else {
                window.location = "/"; //successful register, return to login page
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="login-card rounded">
                    <div className="container text-center App">
                        <div className="text-left">
                            <form onSubmit={onSubmitForm}>
                                <div className="title">
                                    <h2 className="text-center font-weight-bold">Sign Up</h2>
                                </div>
                                <p className="text-muted text-center">Welcome to BidOff. Please fill out the information below</p>
                                <div className="form-group">
                                    <label className="font-weight-bold">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        name="phone_number"
                                        value={user.phone_number}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Create Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={user.first_name}
                                        placeholder="First Name"
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        value={user.last_name}
                                        placeholder="Last Name"
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={user.address}
                                        placeholder="Address"
                                        onChange={handleValueChange}
                                    />
                                </div>

                                {/* <Link to="/dashboard" > */}
                                    <button type="submit" className="btn btn-primary btn-block submit-button">Submit</button>
                                {/* </Link> */}
                            </form>
                        </div>
                    </div>
                </div>     
            </div>
        </Fragment>
    )
}
export default Register;