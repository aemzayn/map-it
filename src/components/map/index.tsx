import { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import "leaflet/dist/leaflet.css";
import classNames from "classnames";

export default function MapContainer() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative min-h-full w-full overflow-hidden bg-red-50">
      <LeafletMap
        bounds={[
          [49.505, -2.09],
          [53.505, 2.09],
        ]}
        className="col-span-3"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </LeafletMap>

      <button
        id="toggle-btn"
        className="absolute left-5 bottom-5 z-[1000] rounded-full bg-red-50 p-2 text-lg text-black shadow-lg duration-200 hover:-translate-y-1 hover:bg-gray-200"
        onClick={() => setShow((prev) => !prev)}
      >
        <PlusIcon
          className={classNames(
            "h-6 w-6 duration-200 ease-in-out",
            show && "rotate-[135deg]"
          )}
        />
      </button>

      <aside
        className={classNames(
          "absolute right-0 top-0 bottom-0 z-[1000] col-span-1 w-80 bg-slate-700 p-10 text-lg text-white drop-shadow-xl transition-all duration-300 ease-in-out",
          show ? "translate-x-0" : "translate-x-full"
        )}
      >
        <h1>Hello world</h1>
      </aside>
    </div>
  );
}
