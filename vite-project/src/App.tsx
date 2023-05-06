import React, { useState, useEffect } from "react";
import Login from "./components/Login.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Signup from "./components/Signup.tsx";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { isLoggedIn: false }
  );
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setShowSignup((prevShowSignup) => !prevShowSignup);
  };

  const handleLogin = (accountID, accountBudget) => {
    setIsLoggedIn(true);
    setUser({ isLoggedIn: true, accountID, accountBudget });
    localStorage.setItem(
      "user",
      JSON.stringify({ isLoggedIn: true, accountID, accountBudget })
    );
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

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromLocalStorage && userFromLocalStorage.isLoggedIn) {
      setUser(userFromLocalStorage);
    }
  }, []);

  return (
    <>
      {console.log("user", user)}
      {console.log("localStorage", localStorage.getItem("user"))}
      {user.isLoggedIn ? (
        <Dashboard
          accountID={user.accountID}
          accountBudget={user.accountBudget}
          onLogout={handleLogout}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : showSignup ? (
        <Signup onToggle={handleToggle} onLogin={handleLogin} />
      ) : (
        <Login onToggle={handleToggle} onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
