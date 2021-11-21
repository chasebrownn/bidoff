import React, {Fragment, useState} from "react";

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

            const response = await fetch ("http://localhost:5000/user", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            });
            
            console.log(response);
            window.location = "/"; //once a response has been sent, it refreshes
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
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
        </Fragment>
    )
}
export default Register;