import { useState } from "react";

interface FeaturesProps {
  label: string;
  handleFeature: (feature: string) => void;
  className?: string;
}
function Features(props: FeaturesProps) {
  const { label, handleFeature, className } = props;
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
    setInputValue("");
    console.log("modal shown");
  };
  const handleModalClose = () => {
    setShowModal(false);
    console.log("modal hidden");
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = () => {
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      handleFeature(inputAmount.toString());
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
              <p className="modal-label">{label.toUpperCase()}</p>
              <span className="close-main" onClick={handleModalClose}>
                &times;
              </span>
            </div>
            <form className="modal-main-content-footer" onSubmit={handleSubmit}>
              <input
                placeholder="0"
                className="input-modal"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Features;
