import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";

function Signup({ onToggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountID, setAccountID] = useState("");
  const [accountBudget, setAccountBudget] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let newAccountID;
    const existingIDs = users.map((user) => user.accountID);

    do {
      newAccountID = generateAccountID();
    } while (existingIDs.includes(newAccountID));

    const newAccountBudget =
      Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
    const newUser = {
      email,
      password,
      accountID: newAccountID,
      accountBudget: newAccountBudget,
      isLoggedIn: false, // add isLoggedIn property with initial value of false
    };
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("User already exists!");
    } else if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("User registered successfully!");
      setAccountID(newAccountID);
      setAccountBudget(newAccountBudget);
      onToggle(); // switch to Login component
    }
  };

  const generateAccountID = () => {
    let accountId = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
      accountId += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return accountId;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Signup</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Signup
        </Button>
        <div className="mt-3">
          Already have an account?{" "}
          <button type="button" className="btn btn-link p-0" onClick={onToggle}>
            Login here
          </button>
          .
        </div>
      </Form>
    </div>
  );
}

export default Signup;
