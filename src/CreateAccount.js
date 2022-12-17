import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./api/context/AuthProvider";
import axios from "./api/axios";

import useAuth from "./hooks/useAuth";

import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";

const ACC_URL = "/open_account";

const CreateAccount = () => {
  const errRef = useRef();

  const [balance, setBalance] = useState("");

  const currency = "GBP";
  const userId = useAuth().auth.userId;
  const token = useAuth().auth.accessToken;
  const [erro, setErrMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(token);
      const response = await axios.post(
        ACC_URL,
        JSON.stringify({ userId, balance, currency }),
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      alert("Account Created with balance: " + balance);
      window.location.href = "/";
    } catch (err) {
      console.log("not working");
      setErrMsg("Something went wrong");
    }
  };

  return (
    <>
      <p
        ref={errRef}
        className={erro ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {erro}
      </p>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <div className="pt-5">
            <label className="form-label" htmlFor="nb">
              Enter your account's balance
            </label>
            <input
              className="form-control"
              type="float"
              id="nb"
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </div>

          <div className="pt-2">
            <button className="btn btn-outline-success m-2">Create</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
