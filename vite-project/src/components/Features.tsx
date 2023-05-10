import { useState } from "react";

function Features(props) {
  const { label, handleFeature, className } = props;
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
      handleModalClose();
    }
  };
  return (
    <>
      <button className={className} onClick={handleModalOpen}>
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
                className="input-modal"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button className="input-modal-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Features;
