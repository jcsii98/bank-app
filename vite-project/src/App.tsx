import { useState } from "react";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Dashboard from "./components/Dashboard.tsx";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <>
      {authenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : showLogin ? (
        <Login onToggle={handleToggle} onLogin={handleLogin} />
      ) : (
        <Signup onToggle={handleToggle} onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
