import React, { useState, useEffect } from "react";
import "./DashBoard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavbarDash from "../components/NavbarDash";
import Mapbox from "../components/Mapbox";

import PassengersMarker from "../components/PassengersMarker";
import PesoIcon from "../assets/icons/peso.png";
import PaymentModal from "../components/PaymentModal";
import PassengerIcon from "../assets/icons/passenger.png";

function DashBoard(props) {
  const [IsPaymentOpen, setIsPaymentOpen] = useState(false);
  const [IsPassengerOpen, setIsPassengerOpen] = useState(false);
  const [Passengers, setPassengers] = useState([]);

  const handleTogglePayment = () => {
    setIsPaymentOpen((prevIsPaymentOpen) => !prevIsPaymentOpen);
  };

  const handleTogglePassenger = () => {
    setIsPassengerOpen((prevIsPassengerOpen) => !prevIsPassengerOpen);
  };

  useEffect(() => {
    const storedPassengers =
      JSON.parse(localStorage.getItem("Passengers")) || [];
    setPassengers(storedPassengers);
  }, []);

  return (
    <>
      <div>
        <NavbarDash />
      </div>
      <div className="map-container">
        <Mapbox />

        <div className="payment-icon">
          <a href="#" onClick={handleTogglePayment}>
            <img
              className="img-payment-icon"
              src={PesoIcon}
              alt="payment-icon"
            />
          </a>
        </div>
        {IsPaymentOpen && (
          <PaymentModal onClose={() => setIsPaymentOpen(false)} />
        )}

        <div className="passenger-icon p-2">
          <a href="#" onClick={handleTogglePassenger}>
            <img
              className="img-passenger-icon"
              src={PassengerIcon}
              alt="passenger-icon"
            />
          </a>
          {IsPassengerOpen && (
            <PassengersMarker onClose={() => setIsPassengerOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
