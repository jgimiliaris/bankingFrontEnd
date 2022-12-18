import React, { useEffect, useState, useRef } from "react";
import useAuth from "./hooks/useAuth";
import Login from "./Login";
import axios from "./api/axios";
import Header from "./components/Header/Header";

const HISTORY_URL = "/transactions";

const User = () => {
  const userId = useAuth().auth.userId;
  const token = useAuth().auth.accessToken;
  const fName = useAuth().auth.userFname;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const response = await axios.get(HISTORY_URL, {
      headers: {
        "x-access-token": token,
      },
    });
    //console.log(response?.data);
    setHistory(response.data);

    const transactions = response?.data;

    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index].transactionId;
      console.log(transaction);
    }
  };

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

        <table className="table">
          <thead>
            <tr>
              <th>Your transaction ID</th>
              <th>Ammount</th>
              <th>Account Used</th>
            </tr>
          </thead>
          <tbody>
            {history.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.transacitonAmount}</td>
                <td>{transaction.accountId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Home = () => {
  return <User />;
};

export default Home;
