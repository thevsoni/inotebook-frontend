import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'; it is in older version
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const host = "http://localhost:5000" //we can make env file for these things



    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //API call
        const url = `${host}/api/auth/login/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save the token and redirect
            localStorage.setItem('token', json.authtoken);

            //set usertoken 
            // setUserToken(json.authtoken);
            //i will use local storage for this

            //to redirect ,we use navigate
            navigate('/');
            props.showAlert("LoggedIn successfully", "success");

        }
        else {
            // alert("invalid credentials");
            props.showAlert("Invalid credentials. if u didnt signup then firstly u have to signup", "danger");

        }
    }

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" minLength={3} id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login