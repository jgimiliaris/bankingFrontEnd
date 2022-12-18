import useAuth from "./hooks/useAuth";
import React, { useEffect, useState, useRef } from "react";
import axios from "./api/axios";

const GETACCOUNTS_CURL = "/accounts";

const TRANSFER_URL = "/tranfer";

const NaccountTransaction = () => {
  //const userId = useAuth.auth.userId;
  const token = useAuth().auth.accessToken;
  //console.log("entered the porg 1");

  //const [jsonData, setJsonData] = useState([]);

  const [result, setResult] = useState([]);
  const [selectedValue, setselectedValue] = useState([]);

  const [ammount, setAmmount] = useState();
  const [destAccount, setdestAccount] = useState();
  const [validAmmount, setValidAmmount] = useState();

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  //const userAccounts = result;

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    //console.log("loading");
    const response = await axios.get(GETACCOUNTS_CURL, {
      headers: {
        "x-access-token": token,
      },
    });

    setResult(response.data);
    console.log(result);

    // const accounts = result?.data;

    // for (let index = 0; index < accounts.length; index++) {
    //   const account = accounts[index].accountId;
    //   console.log(account);
    // }
  };

  //const userAccounts = result;
  //console.log(userAccounts);

  const search = (array, key, value) => {
    for (const element of array) {
      if (element[key] === value) {
        return element;
      }
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    //console.log(selectedValue);
    //console.log(ammount);

    const balanceSelected = search(result, "accountId", selectedValue);

    console.log(selectedValue);

    if (balanceSelected.balance < ammount) {
      setErrMsg("Insufficient Balance to perform this transaction");
    } else {
      const accountId = selectedValue;

      const Ndata = {
        accountId: selectedValue,
        transactionAmount: ammount,
        destinationAccount: destAccount,
      };

      //console.log(Ndata);

      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };

      try {
        const response = await axios.post(TRANSFER_URL, Ndata, config);

        console.log("success? " + response);
        alert("Your transaction of " + ammount + " was performed succesfuly!");

        window.location.href = "/";

        //console.log(response);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server Response");
        } else {
          setErrMsg("Unable to do transaction");
          console.log(typeof ammount);
        }
      }
    }
  };

  return (
    <div>
      <h1>New transaction page</h1>
      {/* <div>
        {userAccounts.map((account) => (
          <div>
            <p>Account ID: {account.accountId}</p>
            <p>Balance: {account.balance}</p>
          </div>
        ))}
      </div> */}
      <form onSubmit={handlesubmit}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <div className="mb-3 formBox">
          <label htmlFor="select" className="form-label">
            Select an account:
          </label>

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

          <label htmlFor="ammount" className="form-label m-3">
            Enter the ammount
          </label>
          <input
            type="float"
            className="form-control"
            id="ammount"
            onChange={(e) => setAmmount(e.target.value)}
          />
          <label htmlFor="destAccount" className="form-label m-3">
            Enter the reciever account
          </label>
          <input
            type="text"
            className="form-control"
            id="destAccount"
            onChange={(e) => setdestAccount(e.target.value)}
          />

          <div className="m-3 ">
            <button
              className="btn btn-outline-success"
              disabled={!ammount || !destAccount ? true : false}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const NewTransaction = () => {
  return <NaccountTransaction />;
};

export default NewTransaction;
