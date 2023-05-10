import BigContainer from "./BigContainer";
import React, { useState } from "react";
import Credentials from "./Credentials";

function Dashboard(props) {
  const { name, cardNumber, balance, expiryDate, expenses } = props;
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const handleClick = () => {
    console.log("logout button clicked");
    setIsLoggedOut(true);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      return { ...user, status: false };
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <>
      {isLoggedOut ? (
        <Credentials />
      ) : (
        <>
          <div className="dash-header">
            <div className="greet">
              <p>Hi, {name}!</p>
            </div>
            <button className="btn btn-secondary" onClick={handleClick}>
              Logout
            </button>
          </div>
          <BigContainer
            cardNumber={cardNumber}
            balance={balance}
            expiryDate={expiryDate}
            expenses={expenses}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
