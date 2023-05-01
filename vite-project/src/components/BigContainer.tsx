import VirtualCard from "./VirtualCard";
import Expenses from "./Expenses";

function BigContainer() {
  return (
    <>
      <div className="big-container">
        <VirtualCard />
        <div className="sm-card-container">
          <div className="sm-card row1">Deposit</div>
          <div className="sm-card row1">Send Money</div>
          <div className="sm-card">Withdraw</div>
          <div className="sm-card">Friends</div>
        </div>
      </div>
      <div className="big-container">
        <Expenses />
      </div>
    </>
  );
}

export default BigContainer;
