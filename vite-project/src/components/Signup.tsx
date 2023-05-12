import { useState } from "react";
import Input from "./Input";

function Signup(props) {
  const { toggleCredentials } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // cash incentive
  const generateRandomNumber = () => {
    const min = 10000;
    const max = 20000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomNumber = generateRandomNumber();

  // Card number
  const generateCardNumber = () => {
    const prefix = "5775";
    const length = 12;
    let randomNum = Math.floor(Math.random() * Math.pow(10, length));
    randomNum = prefix + String(randomNum).padStart(length, "0");
    const formattedNum = randomNum.match(/.{1,4}/g).join(" ");
    return formattedNum;
  };

  const cardNumber = generateCardNumber();

  // expiry date

  const generateExpiryDate = () => {
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 3)
    );
    const expiryMonth = String(expiryDate.getMonth() + 1).padStart(2, "0");
    const expiryYear = String(expiryDate.getFullYear()).slice(2);
    return `${expiryMonth}/${expiryYear}`;
  };
  const expiryDate = generateExpiryDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !name) {
      setError("Please enter a username and password");
      return;
    }
    const user = {
      username,
      name,
      password,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      balance: randomNumber,
      status: false,
      expenses: [], // add an expenses array to the user object
    };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      setError("Username already exists");
    } else {
      toggleCredentials();
      localStorage.setItem("users", JSON.stringify([...users, user]));
      console.log(user);
      console.log(users);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card my-5">
            <div className="card-body p-5">
              <h1 className="mb-4">Signup</h1>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="mb-3 main-form">
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
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
                <button className="btn btn-primary" type="submit">
                  Signup
                </button>
                <div className="mt-3">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-btn"
                    onClick={toggleCredentials}
                  >
                    Login here
                  </button>
                  .
                </div>
              </form>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
