import Dashboard from "./components/Dashboard.tsx";
import Credentials from "./components/Credentials.tsx";

function App() {
  interface User {
    username: string;
    cardNumber: string;
    balance: number;
    expiryDate: string;
    expenses: number[];
    name: string;
    status: boolean;
  }
  const getLoggedInUser = () => {
    const usersJSON = localStorage.getItem("users");
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    return users.find((u) => u.status === true);
  };
  const loggedInUser = getLoggedInUser();
  console.log(loggedInUser);
  return (
    <>
      {loggedInUser ? (
        <Dashboard
          cardNumber={loggedInUser.cardNumber}
          balance={loggedInUser.balance}
          expiryDate={loggedInUser.expiryDate}
          expenses={loggedInUser.expenses}
          name={loggedInUser.name}
        />
      ) : (
        <Credentials />
      )}
    </>
  );
}

export default App;
