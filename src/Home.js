import React from "react";

import useAuth from "./hooks/useAuth";
import Login from "./Login";

import axios from "./api/axios";



const Home = () => {

    return (
        <div className="">
            <h1>Hello this is the Home page</h1>

            <a href="/new_transaction">Make a transaction</a>
            <a href="/create_account">create an account</a>
        </div>
    )
}

export default Home