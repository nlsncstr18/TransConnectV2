import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import PassengerIcon from "../assets/icons/passenger.png";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ";

function App() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchLocation() {
      const response = await fetch("http://192.168.1.80:5000/gps");
      const data = await response.json();
      setLocation(data);
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/basic-v9",
      center: [120.994453, 14.54361], // Default coordinates to show the Philippines
      zoom: 10,
      maxBounds: [
        [118.802719, 13.034402], // Southwest coordinates of Luzon
        [126.627856, 18.568374], // Northeast coordinates of Luzon
      ],
    });

    const PassengersCoords = [
      { lat: 14.54361, lng: 120.994453 },
      { lat: 14.54361, lng: 120.995552 },
      { lat: 14.54361, lng: 120.994453 },
      { lat: 14.54361, lng: 120.995552 },
    ];

    localStorage.setItem("PassengersCoords", JSON.stringify(PassengersCoords)); //saving the passenger markers to local storage

    PassengersCoords.forEach((marker) => {
      const el = document.createElement("img");
      el.src = PassengerIcon;
      el.style.width = "20px";
      el.style.height = "20px";

      el.style.transform = "translate(-50%, -50%)";

      new mapboxgl.Marker({ element: el })
        .setLngLat([marker.lng, marker.lat])
        .addTo(map);
    });

    if (
      location.latitude &&
      location.longitude &&
      !isNaN(location.latitude) &&
      !isNaN(location.longitude)
    ) {
      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .addTo(map); // Add a marker to the map at the current location

      map.setCenter([location.longitude, location.latitude]); // Center the map to the current location
    }

    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [120.98643366717101, 14.657172134647823], // EDSA_MONUMENTO,Monumento
              [120.99803119287168, 14.65732466999657], // EDSA_BAGONG_BARRIO,Bagong Barrio
              [121.00512419084623, 14.657438244671695], // EDSA_BALINTAWAK,Balintawak
              [121.01141074766838, 14.657541174289776], // EDSA_KAINGIN,Kaingin
              [121.019379539233, 14.657666053538478], // EDSA_ROOSEVELT,Roosevelt
              [121.03294507297232, 14.651163538685225], // EDSA_NORTH_AVE,North Ave
              [121.03930423910452, 14.641425673493188], // EDSA_QUEZON_AVE,Quezon Ave
              [121.04694559659185, 14.628450129784369], // EDSA_NEPA_QMART,Nepa Q-Mart
              [121.05346783304196, 14.61425789510831], // EDSA_MAIN_AVE,Main Ave
              [121.05611384183152, 14.608568193473346], // EDSA_SANTOLAN,Santolan
              [121.0562476223397, 14.586561104577427], // EDSA_ORTIGAS,Ortigas
              [121.04595650476392, 14.568473768684427], // EDSA_GUADALUPE,Guadalupe
              [121.03407938298568, 14.554257235817033], // EDSA_BUENDIA,Buendia
              [121.02719482777911, 14.548688688740214], // EDSA_AYALA,Ayala
              [120.99912512910464, 14.537623450769374], // EDSA_TAFT_AVE,Taft Ave
              [120.99084915459844, 14.536736303646222], // EDSA_ROXAS_BLVD,Roxas Blvd
              [120.98350369934849, 14.535246929465103], // MOA,Mall of Asia
              [120.99129487130699, 14.51000407604694], // PITX,PITX
            ],
          },
        },
      ],
    };

    map.on("load", function () {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#00ffff",
          "line-width": 8,
        },
      });
    });
  }, [location]);

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100vw" }} />
    </div>
  );
}

export default App;
