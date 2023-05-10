import { useState } from "react";

function Expenses(props) {
  const {
    currentBalance,
    expenses,
    setCurrentExpenses,
    currentExpenses,
    handleExpenseSubmit,
    setBalance,
  } = props;

  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editedExpenseIndex, setEditedExpenseIndex] = useState(-1);
  const [editedExpenseName, setEditedExpenseName] = useState("");
  const [editedExpenseCost, setEditedExpenseCost] = useState("");
  const handleEditClick = (index) => {
    setEditedExpenseIndex(index);
  };

  const handleEditStart = (index) => {
    const expense = currentExpenses[index];
    setEditedExpenseIndex(index);
    setEditedExpenseName(expense.name);
    setEditedExpenseCost(expense.cost);
  };
  const handleEditSubmit = (index) => {
    const expense = currentExpenses[index];
    const prevInput = Number(expense.cost);
    const newInput = Number(editedExpenseCost);
    const currentBalanceNumber = Number(currentBalance);

    if (newInput === 0) {
      const updatedExpenses = currentExpenses.filter((_, i) => i !== index);
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const newBalance = currentBalanceNumber + prevInput;
      const updatedUsers = users.map((user) => {
        if (user.status) {
          return { ...user, expenses: updatedExpenses, balance: newBalance };
        } else {
          return user;
        }
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setCurrentExpenses(updatedExpenses);
      setBalance(newBalance.toString());
      setEditedExpenseIndex(-1);
      return;
    }

    const inputDiff = prevInput - newInput;
    const newBalance = currentBalanceNumber + inputDiff;
    const updatedExpenses = currentExpenses.map((expense, i) => {
      if (i === index) {
        return { name: editedExpenseName, cost: editedExpenseCost };
      }
      return expense;
    });
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) => {
      if (user.status) {
        return { ...user, expenses: updatedExpenses, balance: newBalance };
      } else {
        return user;
      }
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentExpenses(updatedExpenses);
    setBalance(newBalance.toString());
    setEditedExpenseIndex(-1);
  };

  const handleEditCancel = () => {
    setEditedExpenseIndex(-1);
  };

  const handleModalOpen = () => {
    setShowModal(true);
    console.log("modal shown");
  };
  const handleModalClose = () => {
    setShowModal(false);
    console.log("modal hidden");
  };

  const handleExpenseNameChange = (event) => {
    setExpenseName(event.target.value);
  };
  const handleExpenseCostChange = (event) => {
    setExpenseCost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");
    handleExpenseSubmit(expenseName, expenseCost);
    const inputAmount = expenseCost;
    const newBalance = currentBalance - inputAmount;
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
    setExpenseName("");
    setExpenseCost("");
  };

  return (
    <>
      <div className="expenses-container">
        <div className="expenses-header">
          <div>Expenses</div>
        </div>
        {expenses && (
          <div className="expense-list-container">
            <ul className="expense-list">
              {currentExpenses.map((expense, index) => (
                <li className="expense-item" key={index}>
                  {editedExpenseIndex === index ? (
                    <>
                      <input
                        className="expense-edit"
                        type="text"
                        value={editedExpenseName}
                        onChange={(event) =>
                          setEditedExpenseName(event.target.value)
                        }
                      />
                      <input
                        className="expense-edit expense-edit-cost"
                        type="text"
                        value={editedExpenseCost}
                        onChange={(event) =>
                          setEditedExpenseCost(event.target.value)
                        }
                      />
                      <div className="expense-button-container">
                        <button
                          className="edit-button"
                          onClick={() => handleEditSubmit(index)}
                        >
                          Save
                        </button>
                        <button
                          className="edit-button"
                          onClick={() => handleEditCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="expense-name">{expense.name}</div>
                      <div className="expense-cost">{expense.cost}</div>
                      <button
                        className="edit-button"
                        onClick={() => handleEditStart(index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="button-container-expenses">
          <button
            className="secondary-button"
            type="button"
            onClick={handleModalOpen}
          >
            Add Expense
          </button>
        </div>
        {showModal && (
          <>
            <div className="modal-main">
              <div className="modal-main-content">
                <div className="modal-main-content-header">
                  <p className="modal-label">EXPENSES</p>
                  <span className="close-main" onClick={handleModalClose}>
                    &times;
                  </span>
                </div>
                <form
                  className="modal-expense-content-footer"
                  onSubmit={handleSubmit}
                >
                  <input
                    placeholder="Expense"
                    className="input-modal"
                    type="text"
                    value={expenseName}
                    onChange={handleExpenseNameChange}
                  />
                  <input
                    placeholder="Cost"
                    className="input-modal"
                    type="number"
                    value={expenseCost}
                    onChange={handleExpenseCostChange}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        handleSubmit(event);
                      }
                    }}
                  />
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Expenses;
