import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconUrl from "../../../assets/images/placeholder.png";

const MiniMapComponent = ({ onCoordinatesChange }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([50.4501, 30.5234], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    const customIcon = L.icon({
      iconUrl: markerIconUrl,
      iconSize: [38, 38],
      iconAnchor: [12.5, 41],
    });

    const marker = L.marker([50.4501, 30.5234], {
      icon: customIcon,
      draggable: true,
    }).addTo(map);
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      onCoordinatesChange(position);
    });

    return () => {
      map.remove();
    };
  }, [onCoordinatesChange]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default MiniMapComponent;
