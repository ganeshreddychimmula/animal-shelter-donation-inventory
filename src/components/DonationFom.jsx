import { useState, useEffect } from "react";
import { donationTypes, quantityLabels } from "/src/assets/data.js";

const DonationForm = ({ onSubmit, onClose, initialData }) => {
  const [donorName, setDonorName] = useState("");
  const [type, setType] = useState("Money");
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  // Effect to initialize form fields if initialData is provided.
  useEffect(() => {
    if (initialData) {
      setDonorName(initialData.donorName);
      setType(initialData.type);
      setQuantity(initialData.quantity);
      setDate(initialData.date);
      setError("");
    } else {
      setDonorName("");
      setType("Money");
      setQuantity(0);
      setDate(new Date().toISOString().split("T")[0]);
      setError("");
    }
  }, [initialData]);

  // Handle form submission, validating inputs and calling onSubmit.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!donorName.trim() || quantity <= 0) {
      setError("Please fill out all fields and enter a positive quantity.");
      return;
    }
    onSubmit({
      id: initialData?.id,
      donorName,
      type,
      quantity,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="l-stack b-donation-form">
      <h2>{initialData ? "Edit Donation" : "Add New Donation"}</h2>
      {error && <p className="b-donation-form__error">{error}</p>}
      
      <div className="l-stack b-form-donation__field">
        <label htmlFor="donorName">
          Donor Name
        </label>
        <input
          type="text"
          id="donorName"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="b-donation-form__input"
          placeholder="e.g., Jane Doe"
          required
        />
      </div>

      <div className="l-stack b-form-donation__field">
        <label htmlFor="type">
          Donation Type
      </label>

        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="b-donation-form__input"
        >
          {donationTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="l-stack b-form-donation__field">
        <label htmlFor="quantity">
          {quantityLabels[type]}
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="b-donation-form__input"
          min="1"
          step="1"
          required
        />
      </div>

      <div className="l-stack b-form-donation__field">
        <label htmlFor="date">
          Date of Donation
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="b-donation-form__input"
          required
        />
      </div>

      <div className="l-cluster">
        <button type="button" onClick={onClose} className="b-button b-button--secondary">
          Cancel
        </button>
        <button type="submit" className="b-button">
          {initialData ? "Update" : "Add"} Donation
        </button>
      </div>
    </form>
  );
};

export default DonationForm;
