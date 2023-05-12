import { useState } from "react";
import VirtualCard from "./VirtualCard";
import Expenses from "./Expenses";
import Features from "./Features";

function BigContainer(props) {
  const { cardNumber, balance, expiryDate, expenses } = props;
  const [currentBalance, setBalance] = useState(balance);
  const [currentExpenses, setCurrentExpenses] = useState(expenses);
  const getLoggedInUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find((u) => u.status === true);
  };

  const loggedInUser = getLoggedInUser();

  const handleDepositSubmit = (depositAmount) => {
    const newBalance = currentBalance + depositAmount;
    setBalance(newBalance);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.status) {
        return { ...user, balance: newBalance };
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log(loggedInUser);
  };
  const handleWithdrawSubmit = (withdrawAmount) => {
    if (withdrawAmount > currentBalance) {
      console.log("Amount cannot be greater than balance");
      return;
    }

    const newBalance = currentBalance - withdrawAmount;
    setBalance(newBalance);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.status) {
        return { ...user, balance: newBalance };
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log(loggedInUser);
  };

  const handleExpenseSubmit = (expenseName, expenseCost) => {
    console.log("expense submitted");
    const expense = {
      name: expenseName,
      cost: expenseCost,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.status) {
        return { ...user, expenses: [...user.expenses, expense] }; // add the expense to the user's expenses array
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const currentUser = updatedUsers.find((user) => user.status);
    setCurrentExpenses(currentUser.expenses); // update the expenses state with the new expenses
    console.log("currentExpenses:", currentExpenses);
    console.log(loggedInUser);
  };
  return (
    <>
      <div className="big-container">
        <VirtualCard
          cardNumber={cardNumber}
          balance={currentBalance}
          expiryDate={expiryDate}
        />

        <div className="sm-card-container">
          <Features
            className="sm-card row1"
            label="Deposit"
            handleFeature={handleDepositSubmit}
          />
          <Features
            className="sm-card row1"
            label="Send Money"
            handleFeature={handleWithdrawSubmit}
          />
          <Features
            className="sm-card"
            label="Withdraw"
            handleFeature={handleWithdrawSubmit}
          />
          <Features className="sm-card" label="Friends" />
        </div>
      </div>
      <div className="big-container">
        <Expenses
          expenses={expenses}
          currentExpenses={currentExpenses}
          setCurrentExpenses={setCurrentExpenses}
          handleExpenseSubmit={handleExpenseSubmit}
          setBalance={setBalance}
          balance={currentBalance}
          currentBalance={currentBalance}
        />
      </div>
    </>
  );
}

export default BigContainer;
