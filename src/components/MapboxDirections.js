// import React, { useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ";

// const Map = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     const initializeMap = ({ setMap, mapContainer }) => {
//       const map = new mapboxgl.Map({
//         container: mapContainer,
//         style: "mapbox://styles/mapbox/basic-v9",
//         center: [120.9928, 14.6487], // Center the map on Monumento
//         zoom: 13,
//       });

//       const directions = new MapboxDirections({
//         accessToken: mapboxgl.accessToken,
//         unit: "metric",
//         profile: "mapbox/driving-traffic",
//         controls: {
//           inputs: false,
//           instructions: false,
//         },
//       });

//       directions.setOrigin([120.99129487130699, 14.51000407604694]); // EDSA_MONUMENTO
//       directions.setDestination([120.98643366717101, 14.657172134647823]); // EDSA_TAFT

//       directions.on("route", (event) => {
//         zoom;
//         const route = event.route[0];
//         const distance = route.distance;
//         const duration = route.duration;
//         console.log(`Distance: ${distance} meters`);
//         console.log(`Duration: ${duration} seconds`);
//       });

//       map.addControl(directions, "top-left");

//       setMap(map);
//     };

//     if (!map)
//       initializeMap({
//         setMap,
//         mapContainer: document.getElementById("map-container"),
//       });
//   }, [map]);

//   return <div id="map-container" style={{ height: "100vh" }} />;
// };

// export default Map;
