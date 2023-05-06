import VirtualCard from "./VirtualCard";
import React, { useState, useEffect } from "react";
import Expenses from "./Expenses";
import Deposit from "./Deposit";

type User = {
  email: string;
  password: string;
  accountID: string;
  accountBudget: number;
  isLoggedIn: boolean;
};

function BigContainer() {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("users")));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find((user) => user.isLoggedIn === true);
    setUser(loggedInUser);
  }, []);

  return (
    <>
      {user ? (
        <div className="big-container">
          <VirtualCard
            accountBudget={user.accountBudget}
            accountID={user.accountID}
          />

          <div className="sm-card-container">
            <Deposit
              accountID={user.accountID}
              accountBudget={user.accountBudget}
            />
            <div className="sm-card row1">Send Money</div>
            <div className="sm-card">Withdraw</div>
            <div className="sm-card">Friends</div>
          </div>
        </div>
      ) : null}
      <div className="big-container">
        <Expenses />
      </div>
    </>
  );
}

export default BigContainer;
