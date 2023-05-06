import Greeting from "./Greeting";
import BigContainer from "./BigContainer";

function Dashboard({
  onLogout,
  accountID,
  accountBudget,
  setUser,
  setIsLoggedIn,
}) {
  const handleClick = () => {
    console.log("logout button clicked");
    handleLogout(accountID, accountBudget);
    onLogout();
  };
  const handleLogout = (accountID: string, accountBudget: number) => {
    // update "user" key
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accountID === accountID) {
      localStorage.removeItem("user");
      console.log("user has been logged out");
    }

    // update "users" key
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.accountID === accountID ? { ...u, isLoggedIn: false, accountBudget } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    window.location.reload();
  };

  return (
    <>
      <div className="dash-header">
        <div className="greet">
          <Greeting />
          <p>Pick a transaction for today.</p>
        </div>
        <button className="btn btn-secondary" onClick={handleClick}>
          Logout
        </button>
      </div>
      <BigContainer
        accountID={accountID}
        accountBudget={accountBudget}
        onLogout={onLogout}
      />
    </>
  );
}

export default Dashboard;
