import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Deposit({ accountID }) {
  const [showModal, setShowModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  const handleDeposit = () => {
    // get current user from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.accountID === accountID);
    if (userIndex > -1) {
      const updatedUser = {
        ...users[userIndex],
        accountBudget: users[userIndex].accountBudget + depositAmount,
      };
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
      console.log("user has deposited successfully");
    }
    // close the modal
    setShowModal(false);
  };

  return (
    <>
      <button className="sm-card row1" onClick={() => setShowModal(true)}>
        Deposit
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentClassName="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Deposit Amount</h2>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
        />
        <button onClick={handleDeposit}>Submit</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </Modal>
    </>
  );
}

export default Deposit;
