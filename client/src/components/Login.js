import React, {Fragment, useState} from "react";

const Login = () => {
    return (
        <Fragment>
            <div>
                <h1 className="text-center mt-5">Register</h1>
                <h4 className="text-center mt-5">Register with an email, a phone number, or both</h4>
                <form className="d-flex flex-column mt-5" onSubmit={onSubmitForm}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleValueChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone_number"
                        value={user.phone_number}
                        onChange={handleValueChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={handleValueChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        value={user.first_name}
                        placeholder="First Name"
                        onChange={handleValueChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        value={user.last_name}
                        placeholder="Last Name"
                        onChange={handleValueChange}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={user.address}
                        placeholder="Address"
                        onChange={handleValueChange}
                    />
                    <button className="btn btn-success">Register</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Login;