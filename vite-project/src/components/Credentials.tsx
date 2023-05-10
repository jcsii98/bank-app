import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

function Credentials() {
  const [showSignup, setShowSignup] = useState(false);

  const toggleCredentials = () => {
    setShowSignup((prevState) => !prevState);
    console.log("togglecredentials clicked");
  };

  if (showSignup) {
    return <Signup toggleCredentials={toggleCredentials} />;
  }
  return <Login toggleCredentials={toggleCredentials} />;
}

export default Credentials;
