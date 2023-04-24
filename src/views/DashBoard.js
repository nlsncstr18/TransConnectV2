import React, { useState } from "react";
import "./DashBoard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavbarDash from "../components/NavbarDash";
import Mapbox from "../components/Mapbox";

import DateTime from "../components/DateTime";

import PesoIcon from "../assets/icons/peso.png";
import PaymentModal from "../components/PaymentModal";
// import CurrentLocation from "../components/CurrentLocation";

const DashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  return (
    <>
      <div>
        <NavbarDash />
      </div>
      <div className="map-container">
        <Mapbox />

        <div className="payment-icon">
          <a href="#" onClick={handleToggleModal}>
            <img
              className="img-payment-icon"
              src={PesoIcon}
              alt="payment-icon"
            />
          </a>
        </div>
        {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
};

export default DashBoard;
