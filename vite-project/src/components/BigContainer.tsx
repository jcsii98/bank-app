import { useState } from "react";
import VirtualCard from "./VirtualCard";
import Expenses from "./Expenses";
import Features from "./Features";

function BigContainer(props) {
  const { cardNumber, balance, expiryDate } = props;
  const [currentBalance, setBalance] = useState(balance);

  const handleDepositSubmit = (depositAmount) => {
    const newBalance = balance + depositAmount;
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
  };
  const handleWithdrawSubmit = (withdrawAmount) => {
    if (withdrawAmount > balance) {
      console.log("Withdrawal amount cannot be greater than balance");
      return;
    }

    const newBalance = balance - withdrawAmount;
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
          <Features label="Deposit" handleFeature={handleDepositSubmit} />
          <Features label="Send Money" handleFeature={handleWithdrawSubmit} />
          <Features label="Withdraw" handleFeature={handleWithdrawSubmit} />
          <Features label="Friends" />
        </div>
      </div>
      <div className="big-container">
        <Expenses />
      </div>
    </>
  );
}

export default BigContainer;
