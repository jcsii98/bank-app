function Expenses() {
  return (
    <>
      <div className="expenses">
        <div className="expenses-header">EXPENSES</div>
        <div className="expense-list-container">
          <div className="expense-list"></div>
          <button className="btn btn-secondary expense-btn">Add Expense</button>
        </div>
      </div>
    </>
  );
}

export default Expenses;
