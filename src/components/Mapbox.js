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
      center: [122.9478, 10.65], // Default coordinates to show the Philippines
      zoom: 10,
      maxBounds: [
        [118.802719, 13.034402], // Southwest coordinates of Luzon
        [126.627856, 18.568374], // Northeast coordinates of Luzon
      ],
    });

    const markers = [
      { lat: 14.54361, lng: 120.994453 },
      { lat: 14.54341, lng: 120.944453 },
      { lat: 14.54351, lng: 120.954453 },
    ];

    markers.forEach((marker) => {
      new mapboxgl.Marker({ element: createMarkerElement(PassengerIcon) })
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
  }, [location]);

  function createMarkerElement(iconUrl) {
    const markerEl = document.createElement("div");
    markerEl.className = "marker";
    markerEl.style.backgroundImage = `url(${iconUrl})`;
    markerEl.style.width = "32px";
    markerEl.style.height = "32px";
    return markerEl;
  }

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100vw" }} />
    </div>
  );
}

export default App;
