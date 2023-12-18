/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import auth from "@utils/auth";
import "leaflet/dist/leaflet.css";
import { Socket, io } from "socket.io-client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

type TrafficLightType = {
  coordinates: {
    lat: number;
    lng: number;
  };
  state: string;
  _id: string;
};

const center = {
  lat: 49.832304, // default latitude
  lng: 24.018259, // default longitude
};
function MyComponent({ setPoint }: any) {
  useMapEvents({
    click: (e) => {
      setPoint(e.latlng);
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return null;
}
interface IProps {
  directionResponse: any[]
  onMapPress?: (obj: { lng: number; lat: number }) => void | null;
}
const CustomMap: React.FC<IProps> = ({
  directionResponse,
  onMapPress
}) => {
  const [trafficLights, setTrafficLights] = useState<TrafficLightType[]>([]);
  

  const getLights = async () => {
    const data = await auth.getTrafficLights();
    console.log(data, "lights");
    setTrafficLights(data);
  };

  useEffect(() => {
    const socket: Socket = io("http://localhost:3001");

    getLights();
    socket.on(
      "trafficLightStateChange",
      (data: { trafficLightId: string; newState: string }) => {
        setTrafficLights((prevLights) =>
          prevLights.map((light) =>
            light._id === data.trafficLightId
              ? { ...light, state: data.newState }
              : light
          )
        );
      }
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  const greenIcon = L.icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/2048px-Ski_trail_rating_symbol-green_circle.svg.png",
    iconSize: [24, 24],
  });

  const redIcon = L.icon({
    iconUrl: "https://pngfre.com/wp-content/uploads/Rad-Circle-3.png",
    iconSize: [24, 24],
  });

  return (
    <div>
      <MapContainer
        style={{ width: "50vw", height: "90vh" }}
        center={center}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trafficLights.map((light: TrafficLightType) => (
          <Marker
            key={light._id}
            position={light.coordinates}
            icon={light.state === "green" ? greenIcon : redIcon}
          />
        ))}
        {directionResponse && <Polyline positions={directionResponse} />}
        <MyComponent setPoint={onMapPress} />
      </MapContainer>
    </div>
  );
};

export default CustomMap;
