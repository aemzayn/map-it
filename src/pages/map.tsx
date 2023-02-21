import dynamic from "next/dynamic";
import Head from "next/head";

const MapContainer = dynamic(
  () => import("../components/map-container").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function Map() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <Head>
        <title>Map it!</title>
        <meta name="description" content="Map it website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MapContainer />
    </div>
  );
}
