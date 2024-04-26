import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import placeholderImg from "../../assets/images/placeholder.png";

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      visibleMarkers: [],
    };
    this.map = null;
    this.markersClusterGroup = null;
  }

  componentDidMount() {
    this.map = L.map("map", {
      center: [50.450001, 30.523333],
      zoom: 10,
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    this.markersClusterGroup = L.markerClusterGroup();
    this.map.addLayer(this.markersClusterGroup);

    fetch("http://localhost:3001/data/")
      .then((response) => {
        if (!response.ok) {
          // Log the response to see what it contains
          response.text().then((text) => {
            console.error("Failed to fetch data:", text);
            throw new Error("Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        this.fullMarkersList = data;
        this.setState({ markers: data, visibleMarkers: data });
      })
      .catch((error) =>
        console.error("Error loading the markers data:", error)
      );

    this.map.on("moveend", () => {
      const bounds = this.map.getBounds();
      const visibleMarkers = this.fullMarkersList.filter((marker) =>
        bounds.contains(
          L.latLng(marker.coordinates.lat, marker.coordinates.lng)
        )
      );
      this.setState({ visibleMarkers });
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  componentDidUpdate() {
    this.markersClusterGroup.clearLayers();

    this.state.markers.forEach((marker) => {
      const newMarker = L.marker(
        [marker.coordinates.lat, marker.coordinates.lng],
        {
          icon: new L.Icon({
            iconUrl: placeholderImg,
            iconSize: [38, 38],
          }),
        }
      ).bindPopup(
        `<strong>${marker.category}</strong><br/>${marker.description}`
      );

      this.markersClusterGroup.addLayer(newMarker);
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  render() {
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div id="map" style={{ height: "100%", width: "75%" }}></div>
        <div style={{ width: "25%", overflowY: "auto" }}>
          {this.state.visibleMarkers.length > 0 ? (
            this.state.visibleMarkers.map((marker, index) => (
              <div
                key={index}
                style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
              >
                <img
                  src={marker.imgUrl}
                  alt={marker.announcement}
                  style={{ width: "100%", height: "auto" }}
                />
                <h2>{marker.announcement}</h2>
                <p>{marker.description}</p>
                <p>Price: {marker.price}</p>
                <p>
                  Coordinates: {marker.coordinates.lat},{" "}
                  {marker.coordinates.lng}
                </p>
              </div>
            ))
          ) : (
            <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
              <p>No visible listings in this area.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MapComponent;
