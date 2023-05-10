import { useState } from "react";

function Features(props) {
  const { label, handleFeature } = props;
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
    setInputValue("0");
    console.log("modal shown");
  };
  const handleModalClose = () => {
    setShowModal(false);
    console.log("modal hidden");
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = () => {
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      handleFeature(inputAmount);
      console.log("Amount entered:", inputAmount);
    }
  };
  return (
    <>
      <button className="sm-card row1" onClick={handleModalOpen}>
        {label}
      </button>
      {showModal && (
        <div className="modal-main">
          <div className="modal-main-content">
            <div className="modal-main-content-header">
              <p>{label}</p>
              <span className="close-main" onClick={handleModalClose}>
                &times;
              </span>
            </div>
            <div className="modal-main-content-footer">
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Features;
