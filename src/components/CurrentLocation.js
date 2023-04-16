import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

function CurrentLocation() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ";
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => response.json())
          .then((data) => {
            const city = data.features[0].context.find((context) =>
              context.id.includes("place")
            ).text;
            const country = data.features[0].context.find((context) =>
              context.id.includes("country")
            ).text;
            setLocation(`${city}, ${country}`);
          });
      },
      (error) => {
        console.error(error);
        setLocation("Unable to retrieve your location");
      }
    );
  }, []);

  return (
    <div>
      <p>{location}</p>
    </div>
  );
}

export default CurrentLocation;
