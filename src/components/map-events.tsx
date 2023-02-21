import type { LatLng, LeafletMouseEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";

type MapEventsProps = {
  addMarker(coord: LatLng): void;
  show: boolean;
};

export default function MapEvents({ addMarker, show }: MapEventsProps) {
  useMapEvents({
    click: (map: LeafletMouseEvent) => {
      if (show) {
        addMarker(map.latlng);
      }
    },
  });

  return null;
}
