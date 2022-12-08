
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./api/context/AuthProvider";
import axios from "./api/axios";

import useAuth from "./hooks/useAuth";

import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = '/login'

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(user, pwd)
        try {
            console.log(user, pwd)
            const response = await axios.post(LOGIN_URL, JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }

            );
            console.log("success? " + JSON.stringify(response?.success));
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;

            const accessToken1 = JSON.stringify(response?.data?.accessToken);

            console.log("new token is: "+accessToken1);

            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });

            setUser('');
            setPwd('');
        
            navigate(from, { replace: true });
        } catch (err) {

            if (!err?.response) {
                setErrMsg('No server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username of Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorised');
            } else {
                setErrMsg('Login failed');
            }

            errRef.current.focus();
        }
        /*
        setSuccess(true);
        console.log(user, pwd);
        setUser('');
        setPwd('');
        */
    }

    return (

        <div className="formBox">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form onSubmit={handleSubmit}>
                <div className="pt-5">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
                </div>

                <div className="pt-2">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required className="form-control" />

                </div>

                <div className="pt-2">
                    <button className="btn btn-outline-success">Sign In</button>
                </div>
            </form>

            <p>Need an account created?
                <span>{/*waitinggggggg*/} <a href="/register">Sign Up</a></span>
            </p>


        </div>


    )

}

export default Login