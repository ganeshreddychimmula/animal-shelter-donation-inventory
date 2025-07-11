import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DonationForm from "./components/DonationFom";

const initialDonations = [
  { id: '1', donorName: 'Alice Johnson', type: "Money", quantity: 100, date: '2024-07-15' },
  { id: '2', donorName: 'Bob Williams', type: "Food", quantity: 20, date: '2024-07-14' },
  { id: '3', donorName: 'Charlie Brown', type: "Clothing", quantity: 50, date: '2024-07-13' },
  { id: '4', donorName: 'Diana Prince', type: "Clothing", quantity: 15, date: '2024-07-12' },
  { id: '5', donorName: 'Alice Johnson', type: "Food", quantity: 10, date: '2024-07-11' },
];


function App() {
  const [donationsList, setDonationsList] = useState(initialDonations);


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  // will use the native Form handling introduced in react 19
  return (
    <>
      <Header />
      <main>
      <DonationForm
        onSubmit={(data) => {
          console.log("Form submitted with data:", data);
          // Here you would typically send the data to your server or update state
        }}
        onClose={() => console.log("Form closed")}
        initialData={null} // Pass null for a new donation, or an object to edit
      />
      <div className="donation-list">
        {donationsList.map((donation) => (
          <div key={donation.id} className="donation-item">
            <h3>{donation.donorName}</h3>
            <p>Type: {donation.type}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
            <button onClick={() => console.log("Edit donation", donation.id)}>Edit</button>
            <button onClick={() => console.log("Delete donation", donation.id)}>Delete</button>
          </div>
        ))}
      </div>
      </main>
    </>
  );
}

export default App;
