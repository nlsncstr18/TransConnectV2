import React, { useState, useEffect } from "react";

function App() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchLocation() {
      const response = await fetch("http://192.168.100.195:5000/gps");
      const data = await response.json();
      setLocation(data);
    }
    fetchLocation();
  }, []);

  return (
    <div>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}

export default App;
