import Greeting from "./Greeting";
import BigContainer from "./BigContainer";
function Dashboard({ onLogout }) {
  return (
    <>
      <div className="dash-header">
        <div className="greet">
          <Greeting onLogout={onLogout} />
          <p>Pick a transaction for today.</p>
        </div>
        <button className="btn btn-primary" onClick={onLogout}>
          Logout
        </button>
      </div>
      <BigContainer />
    </>
  );
}

export default Dashboard;
