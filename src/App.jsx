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
  const donationTypes = ["Money", "Food", "Clothing"];
  const [donationsList, setDonationsList] = useState(initialDonations);
  const [editingDonation, setEditingDonation] = useState(null);
  const [filter, setFilter] = useState("");


  // Function to handle editing a donation
  // This sets the donation to be edited in the form, allowing the user to modify it
  // When the form is submitted, it will either update the existing donation or add a new
  // one if no existing donation is being edited.
  const editDonation = (donation) => {
    setEditingDonation(donation);
  };

  const deleteDonation = (donationId) => {
    // Filter out the donation with the given ID from the list
    setDonationsList((prevList) => prevList.filter((d) => d.id !== donationId));
    // Clear the editing state if the deleted donation was being edited
    if (editingDonation && editingDonation.id === donationId) {
      setEditingDonation(null);
    }
  };

  const handleSubmit = (donation) => {
    // If editing an existing donation, update it in the list
    const moneyDonation = donationsList.find(d => d.id === donation.id);
    if (editingDonation) {
      setDonationsList((prevList) =>
        prevList.map((d)=> d.id === donation.id ? donation : d)
      );
      setEditingDonation(null); // Clear editing state after submission
    } else {
      // If adding a new donation, generate a new ID and add it to the list
      const newDonation = {
        ...donation,
        id: (Math.max(...donationsList.map(d => parseInt(d.id))) + 1).toString(), // Generate a new ID
      };
      setDonationsList((prevList) => [...prevList, newDonation]);
    }
  };

  const donationSummaryElementByFilter = () =>{
    if(!filter) return null;
    else if(filter === "Money"){
      return (
      <p>Total Amount: ${donationsList.reduce((total, donation) => {
          return total + (donation.type === "Money" ? donation.quantity : 0);
        }, 0)}</p>
      )
    } else if(filter === "Food"){
      return (
      <p>Total Food Donations: {donationsList.reduce((total, donation) => {
          return total + (donation.type === "Food" ? donation.quantity : 0);
        }, 0)} kg</p>)
    } else if(filter === "Clothing"){
      return (
         <p>Total Clothing Donations: {donationsList.reduce((total, donation) => {
          return total + (donation.type === "Clothing" ? donation.quantity : 0);
        }, 0)} items</p>
      )
  }}

  // will use the native Form handling introduced in react 19
  return (
    <>
      <Header />
      <main>
      <DonationForm
        onSubmit={(donation) => {
          handleSubmit(donation);
        }}
        onClose={() =>{console.log("Form closed without saving")}
        } // Pass null to close the form without saving
        initialData={editingDonation || null} // Pass null for a new donation, or an object to edit
      />
      <section className="donation-summary">
        <p>Total Donations: {donationsList.length}</p>
        <p>Total Money Donations: ${donationsList.reduce((total, donation) => {
          return total + (donation.type === "Money" ? donation.quantity : 0);
        }, 0)}</p>
        {donationSummaryElementByFilter()}
      </section>
      <section classname="filter-section">
        <label htmlFor="filter">FDonation List
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All</option>
          {
            donationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))
          }
        </select>
        </label>
      </section>
      <div className="donation-list">
        {donationsList.filter((donation) => (filter ? donation.type === filter : true)  ).map((donation) => (
          <div key={donation.id} className="donation-item">
            <h3>{donation.donorName}</h3>
            <p>Type: {donation.type}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
            <button onClick={()=>{editDonation(donation)}}>Edit</button>
            <button onClick={() => deleteDonation(donation.id)}>Delete</button>
          </div>
        ))}
      </div>
      </main>
    </>
  );
}

export default App;
