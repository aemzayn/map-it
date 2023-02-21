import { useState } from "react";
import { MapContainer as LeafletMap, Marker, TileLayer } from "react-leaflet";
import L, { type LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";

import Sidebar from "./sidebar";
import AddButton from "./add-button";
import MapEvents from "./map-events";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { api } from "../utils/api";

const DefaultIcon = L.icon({
  iconUrl: icon as unknown as string,
  shadowUrl: iconShadow as unknown as string,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapContainer() {
  const [show, setShow] = useState(false);
  const [coord, setCoord] = useState<LatLng>();

  function addMarker(coord: LatLng) {
    setCoord(coord);
  }

  const icon = L.icon({
    iconUrl: "/images/markers/marker-icon.png",
    iconSize: [14, 22],
  });

  const { data: markers } = api.blog.getMarkers.useQuery();

  return (
    <div className="relative min-h-full w-full overflow-hidden bg-red-50">
      <LeafletMap
        bounds={[
          [49.505, -2.09],
          [53.505, 2.09],
        ]}
        className="col-span-3"
        style={{ height: "100%", width: "100%" }}
        preferCanvas
      >
        <MapEvents show={show} addMarker={addMarker} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={icon}
          />
        ))}
        {coord && (
          <Marker
            position={coord}
            icon={icon}
            eventHandlers={{
              click: () => {
                setShow(true);
              },
            }}
          />
        )}
      </LeafletMap>
      <AddButton show={show} setShow={setShow} />
      <Sidebar show={show} coord={coord} />
    </div>
  );
}
