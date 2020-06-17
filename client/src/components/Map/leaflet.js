import React, { useState } from "react";
import { Map, TileLayer } from "react-leaflet";
import MarkerCluster from "./MarkerCluster";

const position = [51.505, -0.09];
const mapStyle = { height: "50vh",position:"relative" };

const Leaflet = (props) => {

  console.log(props.markers)
  const [markers, setMarkers] = useState([props.markers])

  const handleClick = () => {
    // setMarkers([
    //   {
    //     position: { lng: -110.673447, lat: 40.5225581 },
    //     text: "Voodoo Doughnut"
    //   },
    //   {
    //     position: { lng: -110.6781446, lat: 40.5225512 },
    //     text: "Bailey's Taproom"
    //   },
    //   {
    //     position: { lng: -110.67535700000002, lat: 40.5192743 },
    //     text: "Barista"
    //   }
    // ]);
  };

  return (
    <>
      <Map center={position} zoom={2} style={mapStyle} maxZoom={20}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerCluster markers={props.markers} />
      </Map>
      <button onClick={handleClick}>Change cluster</button>
    </>
  );
};

export default Leaflet;
