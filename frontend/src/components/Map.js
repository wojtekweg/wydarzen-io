// https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
import React from "react";
import L from "leaflet";

function Map() {
  // TODO read documentation and edit it
  React.useEffect(() => {
    // create map
    L.map("map", {
      center: [49.8419, 24.0315],
      maxWidth: 10,
      maxHeight: 10,
      zoom: 16,
      layers: [L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")],
    }).locate();
  }, []);

  return <div id="map"></div>;
}

export default Map;
