import { useState } from "react";
import VirtualCard from "./VirtualCard";
import Expenses from "./Expenses";
import Features from "./Features";

interface BigContainerProps {
  cardNumber: string;
  balance: number;
  expiryDate: string;
  expenses: number[];
}

function BigContainer(props: BigContainerProps) {
  const { cardNumber, balance, expiryDate, expenses } = props;
  const [currentBalance, setBalance] = useState(balance);
  const [currentExpenses, setCurrentExpenses] = useState(expenses);

  const handleDepositSubmit = (depositAmount: number) => {
    const newBalance = currentBalance + depositAmount;
    setBalance(newBalance);
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    const updatedUsers = users.map((user: any) => {
      if (user.status) {
        return { ...user, balance: newBalance };
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  const handleDepositSubmitString = (depositAmount: string) => {
    const amount = parseInt(depositAmount, 10);
    handleDepositSubmit(amount);
  };
  const handleWithdrawSubmit = (withdrawAmount: number) => {
    if (withdrawAmount > currentBalance) {
      console.log("Amount cannot be greater than balance");
      return;
    }
    const newBalance = currentBalance - withdrawAmount;
    setBalance(newBalance);
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    const updatedUsers = users.map((user: any) => {
      if (user.status) {
        return { ...user, balance: newBalance };
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  const handleWithdrawSubmitString = (withdrawAmount: string) => {
    const amount = parseInt(withdrawAmount, 10);
    handleWithdrawSubmit(amount);
  };
  const handleExpenseSubmit = (expenseName: any, expenseCost: any) => {
    console.log("expense submitted");
    const expense = {
      name: expenseName,
      cost: expenseCost,
    };
    const usersJSON = localStorage.getItem("users");
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    const updatedUsers = users.map((user: any) => {
      if (user.status) {
        return { ...user, expenses: [...user.expenses, expense] }; // add the expense to the user's expenses array
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    const currentUser = updatedUsers.find((user: any) => user.status);
    setCurrentExpenses(currentUser.expenses); // update the expenses state with the new expenses
    console.log("currentExpenses:", currentExpenses);
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
            handleFeature={handleDepositSubmitString}
          />
          <Features
            className="sm-card row1"
            label="Send Money"
            handleFeature={handleWithdrawSubmitString}
          />
          <Features
            className="sm-card"
            label="Withdraw"
            handleFeature={handleWithdrawSubmitString}
          />
          <Features
            className="sm-card"
            label="Friends"
            handleFeature={handleWithdrawSubmitString}
          />
        </div>
      </div>
      <div className="big-container">
        <Expenses
          expenses={expenses}
          currentExpenses={currentExpenses}
          setCurrentExpenses={setCurrentExpenses}
          handleExpenseSubmit={handleExpenseSubmit}
          setBalance={setBalance}
          currentBalance={currentBalance}
        />
      </div>
    </>
  );
}

export default BigContainer;
