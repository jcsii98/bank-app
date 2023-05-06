function VirtualCard({ accountBudget, accountID }) {
  return (
    <>
      <div className="virtual-card-container">
        <div className="vc-header">Php {accountBudget}</div>
        <div className="vc-footer">
          <div className="vc-footer-left">
            <div className="account-num">{accountID}</div>
            <div className="expiry-date">01/26</div>
          </div>
          <div className="vc-footer-right">
            <img className="vc-footer-img" src="/visa.png" />
          </div>
        </div>
      </div>
    </>
  );
}

export default VirtualCard;
