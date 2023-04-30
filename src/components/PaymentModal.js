import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PaymentModal.css";
import Arrow from "../assets/icons/arrow.png";

import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

function PaymentModal() {
  const [from, setFrom] = useState("From");
  const [to, setTo] = useState("To");
  const [sum, setSum] = useState(Number(from) + Number(to));
  const [from_location, set_from_location] = useState("");
  const [to_location, set_to_location] = useState("");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [locationCurrent, setlocationCurrent] = useState([]);

  const airconRate = { base: 13, perKm: 2.2 };
  //mapbox direcitons without
  const directions = new MapboxDirections({
    accessToken:
      "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ",
    unit: "metric",
    profile: "mapbox/driving-traffic",

    controls: {
      inputs: false,
      instructions: false,
    },
  });
  const currentLocation = useCallback(async () => {
    const response = await fetch("http://localhost:5000/random_coordinate");
    const data = await response.json();
    setlocationCurrent(data);
  }, []);

  const currentLocationRef = useRef(currentLocation);

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentLocationRef.current();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentLocation]);

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

    //calculating the distance and travel time
    const from_lat_long = JSON.parse(from.split(","));
    const to_lat_long = JSON.parse(e.target.value);

    directions.setOrigin(from_lat_long);
    directions.setDestination(to_lat_long);

    directions.on("route", (event) => {
      const route = event.route[0];
      const distanceInMeters = route.distance;
      const durationInSeconds = route.duration;
      const distanceInKm = (distanceInMeters / 1000).toFixed(0);
      const durationInMinutes = (durationInSeconds / 60).toFixed(0);
      setDistance(distanceInKm);
      setDuration(durationInMinutes);

      // calculate the fare based on the distance
      const fare =
        distanceInKm <= 5
          ? airconRate.base
          : airconRate.base + (distanceInKm - 5) * airconRate.perKm;
      setSum(fare.toFixed(0));
    });
  };

  function SaveResult(e) {
    e.preventDefault();
    if (from && to && from !== "From" && to !== "To" && from !== to) {
      var fares = JSON.parse(localStorage.getItem("fares")) || [];

      var fare = {
        fare: sum,
        from_location: from_location,
        to_location: to_location,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        from_lat_long: JSON.parse(from),
        to_lat_long: JSON.parse(to),
      };
      fares.push(fare);
      localStorage.setItem("fares", JSON.stringify(fares));

      setFrom("From");
      setTo("To");
      setSum(0);
      setDistance(0);
      setDuration(0);
      console.log("current", locationCurrent);

      // directionsService
      //   .getDirections({
      //     waypoints: [
      //       { coordinates: from_lat_long },
      //       { coordinates: to_lat_long },
      //     ],
      //   })
      //   .send()
      //   .then((response) => {
      //     const route = response.body.routes[0];
      //     const distance = route.distance;
      //     const duration = route.duration;

      //     console.log(`Distance: ${distance} meters`);
      //     console.log(`Duration: ${duration} seconds`);
      //   });
    }
  }

  // function getDistance(origin, destination, callback) {
  //   const directions = new mapboxgl.Directions({
  //     accessToken:
  //       "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ",
  //     unit: "metric",
  //   });

  //   directions.setOrigin(origin);
  //   directions.setDestination(destination);

  //   directions.on("route", (event) => {
  //     const route = event.route[0];
  //     const distance = route.distance;
  //     const duration = route.duration;

  //     callback(distance, duration);
  //   });

  //   directions.on("error", (event) => {
  //     console.log(event.error.message);
  //   });
  // }

  // function handleSave(e) {
  //   e.preventDefault();
  //   const fromLatLong = JSON.parse(from);
  //   const toLatLong = JSON.parse(to);

  //   getDistance(fromLatLong, toLatLong, (distance, duration) => {
  //     console.log(`Distance: ${distance} meters`);
  //     console.log(`Duration: ${duration} seconds`);

  //     SaveResult(e);
  //   });
  // }

  return (
    <>
      <div className="payment-container">
        <h1 className="payment-section">Payment Section</h1>

        <form onSubmit={SaveResult}>
          <div className="payment-info">
            <label>
              <select className="option1" value={from} onChange={handleFrom}>
                <option disabled defaultValue={"From"}>
                  From:
                </option>
                <option value={JSON.stringify(locationCurrent)}>
                  Current Location
                </option>

                <option
                  value={JSON.stringify([
                    120.98643366717101, 14.657172134647823,
                  ])}
                >
                  Monumento
                </option>
                <option
                  value={JSON.stringify([
                    120.99803119287168, 14.65732466999657,
                  ])}
                >
                  Bagong Barrio
                </option>
                <option
                  value={JSON.stringify([
                    121.00512419084623, 14.657438244671695,
                  ])}
                >
                  Balintawak
                </option>
                <option
                  value={JSON.stringify([121.019379539233, 14.657666053538478])}
                >
                  Roosevelt
                </option>
                <option
                  value={JSON.stringify([
                    121.03294507297232, 14.651163538685225,
                  ])}
                >
                  North Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.03930423910452, 14.641425673493188,
                  ])}
                >
                  Quezon Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.04694559659185, 14.628450129784369,
                  ])}
                >
                  Nepa Q-Mart
                </option>
                <option
                  value={JSON.stringify([
                    121.05346783304196, 14.61425789510831,
                  ])}
                >
                  Main Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.05611384183152, 14.608568193473346,
                  ])}
                >
                  Santolan
                </option>
                <option
                  value={JSON.stringify([
                    121.0562476223397, 14.586561104577427,
                  ])}
                >
                  Ortigas
                </option>
                <option
                  value={JSON.stringify([
                    121.04595650476392, 14.568473768684427,
                  ])}
                >
                  Guadalupe
                </option>
                <option
                  value={JSON.stringify([
                    121.03407938298568, 14.554257235817033,
                  ])}
                >
                  Buendia
                </option>
                <option
                  value={JSON.stringify([
                    121.02719482777911, 14.548688688740214,
                  ])}
                >
                  Ayala
                </option>
                <option
                  value={JSON.stringify([
                    120.99912512910464, 14.537623450769374,
                  ])}
                >
                  Taft Ave
                </option>
                <option
                  value={JSON.stringify([
                    120.98350369934849, 14.535246929465103,
                  ])}
                >
                  Mall of Asia
                </option>
                <option
                  value={JSON.stringify([
                    120.99129487130699, 14.51000407604694,
                  ])}
                >
                  PITX
                </option>
              </select>
            </label>
            <div>
              <img className="img-arrow" src={Arrow} alt="Icon" />
            </div>

            <label>
              <select className="option2" value={to} onChange={handleTo}>
                <option value="To" disabled defaultValue={"To"}>
                  To:
                </option>
                <option
                  value={JSON.stringify([
                    120.99129487130699, 14.51000407604694,
                  ])}
                >
                  PITX
                </option>
                <option
                  value={JSON.stringify([
                    120.98350369934849, 14.535246929465103,
                  ])}
                >
                  Mall of Asia
                </option>
                <option
                  value={JSON.stringify([
                    120.99912512910464, 14.537623450769374,
                  ])}
                >
                  Taft Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.02719482777911, 14.548688688740214,
                  ])}
                >
                  Ayala
                </option>
                <option
                  value={JSON.stringify([
                    121.03407938298568, 14.554257235817033,
                  ])}
                >
                  Buendia
                </option>
                <option
                  value={JSON.stringify([
                    121.04595650476392, 14.568473768684427,
                  ])}
                >
                  Guadalupe
                </option>
                <option
                  value={JSON.stringify([
                    121.0562476223397, 14.586561104577427,
                  ])}
                >
                  Ortigas
                </option>
                <option
                  value={JSON.stringify([
                    121.05611384183152, 14.608568193473346,
                  ])}
                >
                  Santolan
                </option>
                <option
                  value={JSON.stringify([
                    121.05346783304196, 14.61425789510831,
                  ])}
                >
                  Main Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.04694559659185, 14.628450129784369,
                  ])}
                >
                  Nepa Q-Mart
                </option>
                <option
                  value={JSON.stringify([
                    121.03930423910452, 14.641425673493188,
                  ])}
                >
                  Quezon Ave
                </option>
                <option
                  value={JSON.stringify([
                    121.03294507297232, 14.651163538685225,
                  ])}
                >
                  North Ave
                </option>
                <option
                  value={JSON.stringify([121.019379539233, 14.657666053538478])}
                >
                  Roosevelt
                </option>
                <option
                  value={JSON.stringify([
                    121.00512419084623, 14.657438244671695,
                  ])}
                >
                  Balintawak
                </option>
                <option
                  value={JSON.stringify([
                    120.99803119287168, 14.65732466999657,
                  ])}
                >
                  Bagong Barrio
                </option>
                <option
                  value={JSON.stringify([
                    120.98643366717101, 14.657172134647823,
                  ])}
                >
                  Monumento
                </option>
              </select>
            </label>
            <br />
          </div>

          <div className="date-time">{`Distance: ${distance} km`}</div>
          <div className="date-time">{`Duration: ${duration} minutes`}</div>
          <div className="result">{sum ? `₱${sum}` : "₱0"}</div>
          {/* <div className="date-time">
            <DateTime />s
          </div> */}
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
