import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ";

const App = () => {
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [121.774, 12.8797], // Center the map to Manila, Philippines
      zoom: 10,
      maxBounds: [
        [115.6117, 4.5667], // Southwest coordinates of the Philippines
        [126.6025, 20.3119], // Northeast coordinates of the Philippines
      ],
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100vw" }} />
    </div>
  );
};

export default App;
