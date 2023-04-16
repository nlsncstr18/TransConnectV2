import NavbarDash from "../components/NavbarDash";
import React, { useState, useEffect } from "react";
import "./Transactions.css";
function Transactions(props) {
  const [fares, setFares] = useState([]);

  useEffect(() => {
    const storedFares = JSON.parse(localStorage.getItem("fares")) || [];
    setFares(storedFares);
  }, []);

  return (
    <>
      <NavbarDash />
      <table class="content-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {fares.map((fare) => (
            <tr key={fare.id}>
              <td>{fare.from_location}</td>
              <td>{fare.to_location}</td>
              <td>₱{fare.fare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Transactions;
