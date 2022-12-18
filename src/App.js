import logo from "./logo.svg";
import "./App.css";
import Register from "./Register";

import Login from "./Login";
import Header from "./components/Header/Header";
import Home from "./Home";
import Layout from "./Layout";
import CreateAccount from "./CreateAccount";
import NewTransaction from "./newTransaction";

import { Routes, Route } from "react-router-dom";

import RequireAuth from "./RequireAuth";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="" element={<Layout />}>
          {/*public Routes*/}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/*Those need to be protected*/}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="create_account" element={<CreateAccount />} />
            <Route path="new_transaction" element={<NewTransaction />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
