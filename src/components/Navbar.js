import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar(props) {

    // console.log("checking 2")
    let location = useLocation();
    // let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        props.showAlert("u have logged out successfully", "success");
        // navigate('/login');
        //i am usig link so need to provide to 'to' ,using navigate it will not work
        // console.log("logout successfully")
    }

    const [bl, setBl] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // console.log(`The screen width is ${screenWidth}`);

        if (screenWidth > 991) {
            setBl(false)
        }
    }, [screenWidth]); // Run the effect every time screenWidth changes

    useEffect(() => {
        // Add event listener to window object
        window.addEventListener('resize', handleResize);
        // Remove event listener on component unmount
        // return () => {
        //     window.removeEventListener('resize', handleResize);
        // }; //doubt here
    }, []); // Run only once on component mount

    function handleResize() {
        // Update the screenWidth state with new window width
        setScreenWidth(window.innerWidth);
    }

    return (
        <div>

            {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">My iNotebook</Link>
                    <button onClick={() => { setBl(!bl) }} className="navbar-toggler dropdown" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="/contact">Contact</Link>
                            </li>

                        </ul>
                        <form className="d-flex">
                            {

                                !localStorage.getItem('token') ?
                                    <>

                                        <Link className="btn btn-primary mx-1" to='/login' role="button">LogIn</Link>
                                        <Link className="btn btn-primary mx-1" to='/signup' role="button">SignUp</Link>
                                    </>
                                    :
                                    <Link className="btn btn-primary mx-1" onClick={logout} to='/login' role="button">LogOut</Link>

                            }

                        </form>
                    </div>
                </div>
            </nav >
            {
                bl
                &&
                <div className='d-flex flex-row justify-content-end mt-2'>
                    {

                        !localStorage.getItem('token') ?
                            <>

                                <Link className="btn btn-primary mx-1" to='/login' role="button">LogIn</Link>
                                <Link className="btn btn-primary mx-1" to='/signup' role="button">SignUp</Link>
                            </>
                            :
                            <Link className="btn btn-primary mx-1" onClick={logout} to='/login' role="button">LogOut</Link>

                    }
                </div>
            }
        </div >
    )
}

export default Navbar

// useEffect(() => {
        // console.log(location);
        // console.log(location.pathname);
    // }, [useLocation]);