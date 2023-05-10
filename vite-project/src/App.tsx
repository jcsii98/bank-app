import React, { useState, useEffect } from "react";
import Login from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Signup from "./components/Signup.tsx";
import Credentials from "./components/Credentials.tsx";

function App() {
  const getLoggedInUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find((u) => u.status === true);
  };
  const loggedInUser = getLoggedInUser();
  console.log(loggedInUser);
  return (
    <>
      {loggedInUser ? (
        <Dashboard
          username={loggedInUser.username}
          cardNumber={loggedInUser.cardNumber}
          balance={loggedInUser.balance}
          expiryDate={loggedInUser.expiryDate}
        />
      ) : (
        <Credentials />
      )}
    </>
  );
}

export default App;
