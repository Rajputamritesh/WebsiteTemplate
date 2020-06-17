import { useEffect } from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useLeaflet } from "react-leaflet";
import { customMarker } from "./constants";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();

  useEffect(() => {
    mcg.clearLayers();
    if(markers!=="")
    {
      console.log(markers)
      markers.forEach(marker =>{

        let Datee=new Date(marker.date);
        let FullTime=Datee.getHours()+":"+Datee.getMinutes();
        console.log(FullTime);
    
      L.marker(new L.LatLng(marker.latitude,marker.longitude), {
        icon: customMarker
      })
        .addTo(mcg)
        .bindPopup(FullTime+'<hr>'+'<strong>'+marker.name+'</strong>'+'<br/>'+marker.message)
      });
    
  
  }
 

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);

  return null;
};

MarkerCluster.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.objectOf(PropTypes.number).isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default MarkerCluster;
