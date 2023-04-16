// import { useState } from "react";
// import { Marker } from "react-map-gl";
// import "./Mapbox.css";
// function RandomMarkers({ numMarkers, longitude, latitude }) {
//   const [markers, setMarkers] = useState([]);

//   // Generate random markers near the specified longitude and latitude
//   const generateMarkers = () => {
//     const newMarkers = Array.from({ length: numMarkers }, () => {
//       const radius = 0.1; // in degrees
//       const offsetX = Math.random() * radius * 2 - radius;
//       const offsetY = Math.random() * radius * 2 - radius;

//       return {
//         longitude: longitude + offsetX,
//         latitude: latitude + offsetY,
//       };
//     });

//     setMarkers(newMarkers);
//   };

//   generateMarkers();

//   return (
//     <>
//       {markers.map((marker, index) => (
//         <Marker
//           key={index}
//           longitude={marker.longitude}
//           latitude={marker.latitude}
//         >
//           <div className={`marker marker-${index + 1}`} />
//         </Marker>
//       ))}
//     </>
//   );
// }

// export default RandomMarkers;
