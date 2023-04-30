import React, { useState, useEffect, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import PassengerIcon from "../assets/icons/passenger.png";
// import io from "socket.io-client";
// const socket = io("http://192.168.100.164:5000");
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW5zY2FzdHJvIiwiYSI6ImNsZzZuNGQ2bDBmNDYzZHFscnhmMnZtN2EifQ.mbSIm4YFD7X-XELOOByNcQ";

function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastMessage, setLastMessage] = useState(null);
  const [location, setLocation] = useState({});
  const [map, setMap] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [lineLayerId, setLineLayerId] = useState(null);
  const [path, setPath] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });

  // //calling data from raspi server

  const currentLocation = useCallback(async () => {
    const response = await fetch("http://localhost:5000/random_coordinate");
    const data = await response.json();
    setLocation(data);
  }, []);

  const currentLocationRef = useRef(currentLocation);

  useEffect(() => {
    const intervalId = setInterval(() => {
      currentLocationRef.current();
    }, 500);
    return () => clearInterval(intervalId);
  }, [currentLocation]);

  //rendering the mapbox
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v9",
      center: [120.994453, 14.54361],
      zoom: 10,
      maxBounds: [
        [118.802719, 13.034402],
        [126.627856, 18.568374],
      ],
    });

    //adding the passenger markers
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
        .addTo(newMap);
    });
    setMap(newMap);
    return () => newMap.remove();
  }, []);

  //adding the current location marker
  useEffect(() => {
    if (
      map &&
      currentLocationMarker &&
      location.latitude &&
      location.longitude &&
      !isNaN(location.latitude) &&
      !isNaN(location.longitude)
    ) {
      currentLocationMarker.setLngLat([location.longitude, location.latitude]);

      const newCoordinates = [location.longitude, location.latitude];
      if (!previousLocation) {
        setPath({
          ...path,
          geometry: {
            ...path.geometry,
            coordinates: [newCoordinates],
          },
        });
      } else {
        setPath({
          ...path,
          geometry: {
            ...path.geometry,
            coordinates: [...path.geometry.coordinates, newCoordinates],
          },
        });
      }
      setPreviousLocation(newCoordinates);

      if (lineLayerId) {
        map.getSource(lineLayerId).setData(path);
      } else {
        const newLineLayerId = "line-layer-" + Date.now().toString();
        setLineLayerId(newLineLayerId);
        map.addLayer({
          id: newLineLayerId,
          type: "line",
          source: {
            type: "geojson",
            data: path,
          },
          paint: {
            "line-color": "#ff6600",
            "line-width": 4,
          },
        });
      }
    } else if (
      map &&
      location.latitude &&
      location.longitude &&
      !isNaN(location.latitude) &&
      !isNaN(location.longitude)
    ) {
      const marker = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .addTo(map);
      setCurrentLocationMarker(marker);
      setPreviousLocation([location.longitude, location.latitude]);
    }
  }, [location]);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });
  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  //   socket.on("message", (data) => {
  //     setLastMessage(data);
  //   });
  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("message");
  //   };
  // }, []);

  // try {
  //   socket.emit("message", "tanginamo aldrinn");
  //   console.log("success");
  // } catch {
  //   console.log("error");
  // }

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

  // const busStops = [
  //   {
  //     name: "EDSA_MONUMENTO",
  //     coordinates: [120.98973329793985, 14.658102427320797],
  //   },
  //   {
  //     name: "BAGONG_BARRIO",
  //     coordinates: [120.9966130989669, 14.655333180923307],
  //   },
  //   {
  //     name: "BALINTAWAK",
  //     coordinates: [121.00466251386109, 14.658874482201739],
  //   },
  //   {
  //     name: "KAINGIN",
  //     coordinates: [121.01071357743608, 14.660613059757734],
  //   },
  //   {
  //     name: "ROOSEVELT",
  //     coordinates: [121.02375984211487, 14.658454107696976],
  //   },
  //   {
  //     name: "NORTH_AVENUE",
  //     coordinates: [121.03466033948177, 14.652558399288226],
  //   },
  //   {
  //     name: "QUEZON_AVENUE",
  //     coordinates: [121.0445308686648, 14.642676504234403],
  //   },
  //   {
  //     name: "NEPA_Q_MART",
  //     coordinates: [121.05053901684167, 14.630468842706689],
  //   },
  //   {
  //     name: "MAIN_AVENUE",
  //     coordinates: [121.05714797982206, 14.615436707509414],
  //   },
  //   {
  //     name: "SANTOLAN",
  //     coordinates: [121.06143951426422, 14.610536507472577],
  //   },
  //   {
  //     name: "ORTIGAS",
  //     coordinates: [121.058692932195, 14.588359660543826],
  //   },
  //   {
  //     name: "GUADALUPE",
  //     coordinates: [121.04204177862104, 14.569835712314106],
  //   },
  //   {
  //     name: "BUENDIA",
  //     coordinates: [121.03839397444382, 14.5564765292983],
  //   },
  //   {
  //     name: "AYALA",
  //     coordinates: [121.03299200547963, 14.550323660206592],
  //   },
  //   {
  //     name: "TRAMO",
  //     coordinates: [121.01101934918088, 14.538692451900989],
  //   },
  //   {
  //     name: "TAFT_AVENUE",
  //     coordinates: [121.0003763437939, 14.53786162783703],
  //   },
  //   {
  //     name: "MACAPAGAL_AVENUE",
  //     coordinates: [120.98999083047241, 14.540104845503635],
  //   },
  //   {
  //     name: "SM_MOA",
  //     coordinates: [120.97623109831912, 14.536064960209785],
  //   },
  // ];

  // busStops.forEach((stop) => {
  //   new mapboxgl.Marker().setLngLat(stop.coordinates).addTo(map);
  // });

  // Add linestring connecting bus stops
  // const route = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       geometry: {
  //         type: "LineString",
  //         coordinates: busStops.map((stop) => stop.coordinates),
  //       },
  //     },
  //   ],
  // };

  // map.on("load", function () {
  //   map.addLayer({
  //     id: "route",
  //     type: "line",
  //     source: {
  //       type: "geojson",
  //       data: route,
  //     },
  //     layout: {
  //       "line-join": "round",
  //       "line-cap": "round",
  //     },
  //     paint: {
  //       "line-color": "#00ffff",
  //       "line-width": 8,
  //     },
  //   });
  // });

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100vw" }} />
    </div>
  );
}

export default App;
