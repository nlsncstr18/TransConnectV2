import React, { useState } from "react";
import "./PaymentModal.css";
import Arrow from "../assets/icons/arrow.png";
import DateTime from "./DateTime";
import Transactions from "../views/Transactions";

function PaymentModal() {
  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");
  const [sum, setSum] = useState(Number(from) + Number(to));
  const [from_location, set_from_location] = useState("");
  const [to_location, set_to_location] = useState("");

  const handleFrom = (e) => {
    setFrom(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex].text;
    set_from_location(selectedOption);
    setSum(Number(e.target.value) + Number(to));
  };

  const handleTo = (e) => {
    setTo(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex].text;
    set_to_location(selectedOption);
    setSum(Number(e.target.value) + Number(from));
  };

  function SaveResult(e) {
    e.preventDefault();
    if (from && to && from !== "From" && to !== "To" && from !== to) {
      var fares = JSON.parse(localStorage.getItem("fares")) || [];

      var fare = {
        fare: sum,
        from_location: from_location,
        to_location: to_location,
      };
      fares.push(fare);
      localStorage.setItem("fares", JSON.stringify(fares));
    }
  }

  return (
    <>
      <div className="payment-container">
        <h1 className="payment-section">Payment Section</h1>

        <form onSubmit={SaveResult}>
          <div className="payment-info">
            <label>
              <select className="option1" value={from} onChange={handleFrom}>
                <option value="From" disabled selected>
                  From:
                </option>
                <option value="25">Cavite</option>
                <option value="30">Makati</option>
                <option value="35">Pasay</option>
              </select>
            </label>
            <div>
              <img className="img-arrow" src={Arrow} alt="Icon" />
            </div>

            <label>
              <select className="option2" value={to} onChange={handleTo}>
                <option value="To" disabled selected>
                  To:
                </option>

                <option value="25">Cavite</option>
                <option value="30">Makati</option>
                <option value="35">Pasay</option>
              </select>
            </label>
            <br />
          </div>
          <div className="result">{sum ? `₱${sum}` : "₱0"}</div>
          <div className="date-time">
            <DateTime />
          </div>
          <div className="save-button">
            <button className="savebutton" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PaymentModal;
