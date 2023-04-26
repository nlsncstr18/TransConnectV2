import React, { useState, useEffect } from "react";

function MapComponent() {
  const [passengersCoords, setPassengersCoords] = useState([]);

  useEffect(() => {
    // Retrieve the PassengersCoords string from local storage
    const passengersCoordsString = localStorage.getItem("PassengersCoords");

    // Convert the string back to an object
    const passengersCoords = JSON.parse(passengersCoordsString);

    // Update the state with the PassengersCoords array
    setPassengersCoords(passengersCoords);
  }, []);

  return (
    <div>
      <h2>{passengersCoords.length}</h2>
    </div>
  );
}

export default MapComponent;
