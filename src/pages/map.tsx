import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("../components/map-container").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function Map() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <MapContainer />
    </div>
  );
}
