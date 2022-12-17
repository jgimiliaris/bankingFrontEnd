import React from "react";
import useAuth from "./hooks/useAuth";
import Login from "./Login";
import axios from "./api/axios";
import Header from "./components/Header/Header";

const User = () => {
  const userId = useAuth().auth.userId;
  const fName = useAuth().auth.userFname;

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Welcome back, {fName}</h1>
        <div className="container">
          <a href="/new_transaction" className="btn btn-primary my-2">
            New Transaction
          </a>
          <a href="/create_account" className="btn btn-primary my-2 m-2">
            Create Account
          </a>
        </div>
      </div>

      <div>
        <h2 className="display-4">History</h2>
      </div>
    </div>
  );
};

const Home = () => {
  return <User />;
};

export default Home;
