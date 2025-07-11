import React, { useState, useEffect, FormEvent } from 'react';

const DonationForm = ({ onSubmit, onClose, initialData }) => {
  // State for form fields. If initialData is provided, use it to pre-fill the form for editing.
  const donationTypes = ["Money", "Food", "Clothing"];
  const quantityLabels = {
    Money: "Amount ($)",
    Food: "Quantity (kg)",
    Clothing: "Quantity (items)",
    };
  const [donorName, setDonorName] = useState(initialData?.donorName || '');
  const [type, setType] = useState(initialData?.type || "Money");
  const [quantity, setQuantity] = useState(initialData?.quantity || 0);
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  // Effect to reset form state when the donation being edited changes.
  useEffect(() => {
    if (initialData) {
      setDonorName(initialData.donorName);
      setType(initialData.type);
      setQuantity(initialData.quantity);
      setDate(initialData.date);
      setError('');
    } else {
      // Reset to default for a new donation
      setDonorName('');
      setType('Money');
      setQuantity(0);
      setDate(new Date().toISOString().split('T')[0]);
      setError('');
    }
  }, [initialData]);

  // Handles form submission.
  // Don't be confused by the action prop, it's a new way of handling form in React19+ that allows you to use the native form handling capabilities.
  // No need for `onSubmit` or `preventDefault()` manually.
  // I was stuck on this decision for a while, whether to use multiple state or a single state object.
  // I chose multiple state variables for clarity and ease of use, especially since the form is relatively simple.
  // I was also considering using uncontrolled components with refs and fomrData, but figured that would complicate the form handling logic unnecessarily.
  const handleSubmit = (formData) => {
    // Basic validation to ensure required fields are filled and quantity is positive.
    if (!donorName.trim() || quantity <= 0) {
      setError('Please fill out all fields and enter a positive quantity.');
      return;
    }
    // Call the onSubmit prop passed from the parent with the form data.
    onSubmit({
      id: initialData?.id,
      donorName,
      type,
      quantity,
      date,
    });
  };

  return (
    <form action={handleSubmit} className="form">
      {error && <p className="error-mssg">{error}</p>}
      <div>
        <label htmlFor="donorName" className="form-label">Donor Name</label>
        <input
          type="text"
          id="donorName"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="form-name"
          placeholder="e.g., Jane Doe"
          required
        />
      </div>
      <div>
        <label htmlFor="type" className="form-label">Donation Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-type"
        >
          {donationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="quantity" className="form-label">{quantityLabels[type]}</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="form-quantity"
          min="1"
          step="1"
          required
        />
      </div>
      <div>
        <label htmlFor="date" className="form-label">Date of Donation</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-date"
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onClose} className="form-cancel-button">Cancel</button>
        <button type="submit" className="form-submit-button">{initialData ? 'Update' : 'Add'} Donation</button>
      </div>
    </form>
  );    
};

export default DonationForm;