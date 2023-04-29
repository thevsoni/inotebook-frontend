import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'




const Signup = (props) => {

    const host = "https://inotebookbackend5.onrender.com" //we can make env file for these things



    const context = useContext(noteContext);
    const { isLoading, setIsLoading } = context;

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //API call
        const url = `${host}/api/auth/createuser/`;
        setIsLoading(true);
        props.showAlert("Loading...", "success")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.cpassword })
        });
        const json = await response.json();
        // console.log(json);
        setIsLoading(false);
        if (json.success) {
            //save the token and redirect
            localStorage.setItem('token', json.authtoken);

            //set usertoken 
            // setUserToken(json.authtoken);
            //i will use local storage for this

            //to redirect ,we use navigate
            navigate('/');
            props.showAlert("Account created successfully", "success");

        }
        else {
            // alert("invalid credentials"); instead of this,we can provide our alert
            props.showAlert("invalid details", "danger");
        }
    }

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className='container'>
            {/* {
                isLoading && props.showAlert("Loading...", "success")
            } */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} aria-describedby="emailHelp" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} placeholder="Password" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup