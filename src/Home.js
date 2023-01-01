import React, { useEffect, useState, useRef } from "react";
import useAuth from "./hooks/useAuth";
import Login from "./Login";
import axios from "./api/axios";
import Header from "./components/Header/Header";

const HISTORY_URL = "/transactions";

const GETACCOUNTS_CURL = "/accounts";

const User = () => {
  const userId = useAuth().auth.userId;
  const token = useAuth().auth.accessToken;
  const fName = useAuth().auth.userFname;

  const [history, setHistory] = useState([]);

  const [result, setResult] = useState([]);
  const [selectedValue, setselectedValue] = useState();

  // useEffect(() => {
  //   getHistory();
  // }, []);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const response = await axios.get(GETACCOUNTS_CURL, {
      headers: {
        "x-access-token": token,
      },
    });

    setResult(response.data);
  };

  // const getHistory = async () => {
  //   const response = await axios.get(HISTORY_URL, {
  //     headers: {
  //       "x-access-token": token,
  //     },
  //   });

  //   setHistory(response.data);

  //   const transactions = response?.data;

  //   for (let index = 0; index < transactions.length; index++) {
  //     const transaction = transactions[index].transactionId;
  //   }
  // };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      HISTORY_URL,
      JSON.stringify({ accountId: selectedValue }),
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );

    setHistory(response.data);
    const transactions = response?.data;

    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index].transactionId;
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

        <label htmlFor="select" className="form-label">
          Select an account:
        </label>

        <form onSubmit={handlesubmit}>
          <select
            id="select"
            onChange={(e) => setselectedValue(e.target.value)}
            className="form-control"
          >
            {result.map((userAcc) => (
              <option key={userAcc.accountId} value={userAcc.accountId}>
                Account with Balance {userAcc.balance}
              </option>
            ))}
          </select>

          <div className="m-3 ">
            <button className="btn btn-outline-success">Get History </button>
          </div>
        </form>

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
