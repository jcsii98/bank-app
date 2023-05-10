function VirtualCard(props) {
  const { cardNumber, balance, expiryDate } = props;
  return (
    <>
      <div className="virtual-card-container">
        <div className="vc-header">Php {balance}</div>
        <div className="vc-footer">
          <div className="vc-footer-left">
            <div className="account-num">{cardNumber}</div>
            <div className="expiry-date">{expiryDate}</div>
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
