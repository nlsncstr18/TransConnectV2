import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import PassengerIcon from "../assets/icons/passenger.png";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import io from "socket.io-client";
const socket = io("http://192.168.100.164:5000");
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchLocation() {
      const response = await fetch("http://192.168.100.195:5000/gps");
      const data = await response.json();
      setLocation(data);
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", (data) => {
      setLastMessage(data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  try {
    socket.emit("message", "tanginamo aldrinn");
    console.log("success");
  } catch {
    console.log("error");
  }

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v9",
      center: [120.994453, 14.54361], // Default coordinates to show the Philippines
      zoom: 10,
      maxBounds: [
        [118.802719, 13.034402], // Southwest coordinates of Luzon
        [126.627856, 18.568374], // Northeast coordinates of Luzon
      ],
    });
    // const directions = new MapboxDirections({
    //   accessToken: MAPBOX_ACCESS_TOKEN,
    //   unit: "metric",
    //   profile: "mapbox/driving-traffic",
    //   controls: {
    //     inputs: false,
    //     instructions: false,
    //   },
    // });

    // // calculating distance and travel time
    // directions.setOrigin([120.99643366717101, 14.657172134647823]);
    // directions.setDestination([120.98350369934849, 14.535246929465103]);

    // directions.on("route", (event) => {
    //   const route = event.route[0];
    //   const distance = route.distance;
    //   const duration = route.duration;
    //   console.log(`Distance: ${distance} meters`);
    //   console.log(`Duration: ${duration} seconds`);
    // });

    const PassengersCoords = [
      { lat: 14.54361, lng: 120.994453 },
      { lat: 14.54361, lng: 120.995552 },
      { lat: 14.54361, lng: 120.994453 },
      { lat: 14.54361, lng: 120.995552 },
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
    const busStops = [
      {
        name: "EDSA_MONUMENTO",
        coordinates: [120.98643366717101, 14.657172134647823],
      },
      {
        name: "EDSA_BAGONG_BARRIO",
        coordinates: [120.99803119287168, 14.65732466999657],
      },
      {
        name: "EDSA_BALINTAWAK",
        coordinates: [121.00512419084623, 14.657438244671695],
      },
      {
        name: "EDSA_ROOSEVELT",
        coordinates: [121.019379539233, 14.657666053538478],
      },
      {
        name: "EDSA_NORTH_AVE",
        coordinates: [121.03294507297232, 14.651163538685225],
      },
      {
        name: "EDSA_QUEZON_AVE",
        coordinates: [121.03930423910452, 14.641425673493188],
      },
      {
        name: "EDSA_NEPA_QMART",
        coordinates: [121.04694559659185, 14.628450129784369],
      },
      {
        name: "EDSA_MAIN_AVE",
        coordinates: [121.05346783304196, 14.61425789510831],
      },
      {
        name: "EDSA_SANTOLAN",
        coordinates: [121.05611384183152, 14.608568193473346],
      },
      {
        name: "EDSA_ORTIGAS",
        coordinates: [121.0562476223397, 14.586561104577427],
      },
      {
        name: "EDSA_GUADALUPE",
        coordinates: [121.04595650476392, 14.568473768684427],
      },
      {
        name: "EDSA_BUENDIA",
        coordinates: [121.03407938298568, 14.554257235817033],
      },
      {
        name: "EDSA_AYALA",
        coordinates: [121.02719482777911, 14.548688688740214],
      },
      {
        name: "EDSA_TAFT_AVE",
        coordinates: [120.99912512910464, 14.537623450769374],
      },
      { name: "MOA", coordinates: [120.98350369934849, 14.535246929465103] },
      { name: "PITX", coordinates: [120.99129487130699, 14.51000407604694] },
    ];

    busStops.forEach((stop) => {
      new mapboxgl.Marker().setLngLat(stop.coordinates).addTo(map);
    });

    // Add linestring connecting bus stops
    const route = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: busStops.map((stop) => stop.coordinates),
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
          data: route,
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
