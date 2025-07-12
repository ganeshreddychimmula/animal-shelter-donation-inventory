import { useMemo, useState } from "react";
import "./assets/css/global.css";
import "./assets/css/layouts.css";
import "./assets/css/block.css";
import "./assets/css/utilities.css";
import Header from "./components/Header";
import DonationForm from "./components/DonationFom";
import Modal from "./components/Modal";
import { initialDonations, donationTypes } from "./assets/data";

function App() {
  const [donationsList, setDonationsList] = useState(initialDonations);
  const [editingDonation, setEditingDonation] = useState(null);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setEditingDonation(null); // Ensure we're adding a new donation
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDonation(null);
  };

  // Function to edit a donation
  const editDonation = (donation) => {
    setEditingDonation(donation);
    setIsModalOpen(true);
  };

  // Function to delete a donation
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
    const moneyDonation = donationsList.find((d) => d.id === donation.id);
    if (editingDonation) {
      setDonationsList((prevList) =>
        prevList.map((d) => (d.id === donation.id ? donation : d))
      );
      setEditingDonation(null); // Clear editing state after submission
    } else {
      // If adding a new donation, generate a new ID and add it to the list
      const newDonation = {
        ...donation,
        id: (
          Math.max(...donationsList.map((d) => parseInt(d.id))) + 1
        ).toString(), // Generate a new ID
      };
      setDonationsList((prevList) => [...prevList, newDonation]);
    }
    handleCloseModal(); // Close the modal after submission
  };

  const donationSummaryElements = useMemo(() => {
    const quantifier = {
      Money: " ($)",
      Food: " (kg)",
      Clothing: " (items)",
    };

    const filteredTotal = donationsList
      .filter((donation) => (filter ? donation.type === filter : false))
      .reduce((total, donation) => total + donation.quantity, 0);

    return (
      <p>
        Total {filter} Donations: {filteredTotal}
        {filter ? `${quantifier[filter]}` : ""}
      </p>
    );
  }, [donationsList, filter]);

  // Memoize the donation list elements to avoid unnecessary re-renders
  const donationListElements = useMemo(() => {
    const filteredDonations = donationsList.filter((donation) =>
      filter ? donation.type === filter : true
    );

    if (filteredDonations.length === 0) {
      return (
        <div className="l-box u-text-center">
          <p>No donations found for this filter.</p>
        </div>
      );
    }

    return (
      <div className="l-grid">
        {filteredDonations.map((donation) => (
          <div key={donation.id} className="l-box l-stack">
            <div className="b-donation-item__header">
              <h3>{donation.donorName}</h3>
              <p className="b-donation-item__meta">
                {donation.type} - {new Date(donation.date).toLocaleDateString()}
              </p>
            </div>
            <p className="b-donation-item__quantity">
              Quantity: {donation.quantity}
            </p>
            <div
              className="l-cluster"
              style={{ "--cluster-justify": "flex-end", marginTop: "auto" }}
            >
              <button
                className="b-button b-button--secondary"
                onClick={() => editDonation(donation)}
              >
                Edit
              </button>
              <button
                className="b-button b-button--danger"
                onClick={() => deleteDonation(donation.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [donationsList, filter]);

  // will use the native Form handling introduced in react 19
  return (
    <div className="l-stack" style={{"--stack-space": "0"}}>
      <Header />
      <main className="l-stack l-center" style={{"--stack-space": "var(--space-s2)"}}>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <DonationForm
            onSubmit={(donation) => {
              handleSubmit(donation);
            }}
            onClose={handleCloseModal}
            initialData={editingDonation || null}
          />
        </Modal>

        <section className="l-box l-stack">
          <h2>Dashboard</h2>
          <p>Total Donations: {donationsList.length}</p>
          <p>
            {donationsList.reduce((total, donation) => {
              return (
                total + (donation.type === "Money" ? donation.quantity : 0)
              );
            }, 0)}
          </p>
          {filter && donationSummaryElements}
        </section>

        <section className="l-box l-cluster" style={{"--cluster-justify": "space-between"}}>
          <div className="l-cluster"> 
            <label htmlFor="filter">
            Filter by Type:
           </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {donationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleOpenModal}
            className="b-button"
          >
            Add New Donation
          </button>
        </section>
        {donationListElements}
      </main>
    </div>
  );
}

export default App;
