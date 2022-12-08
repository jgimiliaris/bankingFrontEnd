import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Icon from 'react-bootstrap-icons';

import axios from './api/axios';




const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const REGISTER_URL = '/register';

const Register = () => {

    //state for changing field variables

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdfocus, setPwdFocus] = useState(false);


    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validemail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [address, setAddress] = useState('');
    const [adrdessFocus, setAddressFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //set component focus and check usernames etc...

    useEffect(() => {
        userRef.current.focus()
    }, [])


    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])


    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])


    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(pwd);
        setValidEmail(result);
    }, [email])


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ firstname : firstName, lastname : lastName, username : user, password : pwd, address, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken)
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();

        }

        console.log(user, pwd);
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <div className="formBox">
                    <h1>Success!</h1>
                    <p>
                        <a href="login">Sign in</a>
                    </p>
                </div>
            ) : (
                <div>
                    <div className="formBox" >
                        <div className="shadow-lg p-3 mb-5 bg-white rounded">


                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>



                            <form onSubmit={handleSubmit}>
                                <div className="pt-5">
                                    <label htmlFor="username" className="form-label">Username
                                        <span className={validName ? "valid" : "hide"}><Icon.Check2Circle /></span>

                                        <span className={validName || !user ? "hide" : "invalid"}>
                                            <Icon.ExclamationCircle />
                                        </span>

                                    </label>

                                    <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} required className="form-control" aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
                                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>Username Invalid <br /> Must Begin with a letter, it can include letters and numbers and underscores </p>

                                </div>

                                <div className="pt-3">


                                    <label htmlFor="password" className="form-label">Password
                                        <span className={validPwd ? "valid" : "hide"}><Icon.Check2Circle /></span>

                                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                            <Icon.ExclamationCircle />
                                        </span>

                                    </label>

                                    <input type="password" id="pasword" onChange={(e) => setPwd(e.target.value)} required className="form-control" aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />
                                    <p id="pwdnote" className={pwdfocus && !validPwd ? "instructions" : "offscreen"}>Password Invalid <br /> Must Include uppercase and lowercase letters, a number and a special character. <br /> Must be min 8 characters </p>

                                </div>
                                <div className="pt-3">
                                    <label htmlFor="confirm_pwd" className="form-label">Confirm Password
                                        <span className={validMatch && matchPwd ? "valid" : "hide"}><Icon.Check2Circle /></span>

                                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                            <Icon.ExclamationCircle />
                                        </span>

                                    </label>

                                    <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} required className="form-control" aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>Your two passwords don't match</p>
                                </div>



                                <div className="pt-3">
                                    <label htmlFor="firstName" className="form-label"> First Name


                                    </label>

                                    <input type="text" id="firstName" ref={userRef} autoComplete="off" onChange={(e) => setFirstName(e.target.value)} required className="form-control" onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)} />
                                </div>

                                <div className="pt-3">
                                    <label htmlFor="lastName" className="form-label"> Last Name
                                    </label>

                                    <input type="text" id="lastName" ref={userRef} autoComplete="off" onChange={(e) => setLastName(e.target.value)} required className="form-control" onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)} />
                                </div>



                                <div className="pt-3">
                                    <label htmlFor="email" className="form-label">Email
                                        <span className={validemail ? "valid" : "hide"}><Icon.Check2Circle /></span>

                                        <span className={validemail || !email ? "hide" : "invalid"}>
                                            <Icon.ExclamationCircle />
                                        </span>

                                    </label>

                                    <input type="text" id="email" ref={userRef} autoComplete="on" onChange={(e) => setEmail(e.target.value)} required className="form-control" aria-invalid={validemail ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
                                    <p id="uidnote" className={emailFocus && email && !validemail ? "instructions" : "offscreen"}>Email Invalid </p>

                                </div>


                                <div className="pt-3">
                                    <label htmlFor="address" className="form-label"> Address
                                    </label>

                                    <input type="text" id="address" ref={userRef} autoComplete="off" onChange={(e) => setAddress(e.target.value)} required className="form-control" onFocus={() => setAddressFocus(true)} onBlur={() => setAddressFocus(false)} />
                                </div>


                                <div className="pt-3">
                                    <button className="btn btn-outline-success " disabled={!validName || !validPwd || !validMatch || !validemail ? true : false}>SignUp</button>

                                </div>

                            </form>
                        </div>


                    </div>
                    <p className="pt-3">Have an account already? Sign In
                        <span className="line">
                            {/*waiting*/}
                            <a href="login">Here</a>
                        </span>
                    </p>
                </div>

            )}
        </>

    )

}

export default Register