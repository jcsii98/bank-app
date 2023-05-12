import { useState } from "react";
import Input from "./Input";
import Dashboard from "./Dashboard";

function Login(props) {
  const { toggleCredentials } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((u) => u.username === username);
  const submitForm = (event) => {
    event.preventDefault();

    if (!existingUser) {
      setError("Username does not exist");
      return;
    }

    if (existingUser.password !== password) {
      setError("Incorrect password");
      return;
    }

    existingUser.status = true;

    localStorage.setItem("users", JSON.stringify(users));

    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard
          username={existingUser.username}
          cardNumber={existingUser.cardNumber}
          balance={existingUser.balance}
          expiryDate={existingUser.expiryDate}
          expenses={existingUser.expenses}
          name={existingUser.name}
        />
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card my-5">
                <div className="card-body p-5">
                  <h1 className="mb-4">Login</h1>
                  <form autoComplete="off" onSubmit={submitForm}>
                    <div className="mb-3 main-form">
                      <Input
                        type="text"
                        name="username"
                        label="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                    <div className="mb-3 main-form">
                      <Input
                        type="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    <div className="mt-3">
                      Don't have an account?{" "}
                      <button
                        className="btn btn-link p-0 text-btn"
                        type="button"
                        onClick={toggleCredentials}
                      >
                        Sign up here
                      </button>
                      .
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
