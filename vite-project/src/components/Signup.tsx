import { useState } from "react";
import Input from "./Input";

function Signup(props) {
  const { toggleCredentials } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    if (!username || !password) {
      setError("Please enter a username and password");
      return;
    }
    const user = {
      username,
      password,
      cardNumber: cardNumber,
      expiryDate: expiryDate,
      balance: randomNumber,
      status: false,
    };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      setError("Username already exists");
    } else {
      localStorage.setItem("users", JSON.stringify([...users, user]));
      console.log(user);
      console.log(users);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Input
            type="text"
            name="username"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-3">
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
      </form>{" "}
      <div className="mt-3">
        Already have an account?{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={toggleCredentials}
        >
          Login here
        </button>
        .
      </div>
    </div>
  );
}

export default Signup;
