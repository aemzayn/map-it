import { type Dispatch, type SetStateAction } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import type { LatLng } from "leaflet";

type AddButtonProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setCoord: Dispatch<SetStateAction<LatLng | undefined>>;
};

export default function AddButton({ show, setShow, setCoord }: AddButtonProps) {
  return (
    <button
      id="toggle-btn"
      className="absolute left-5 bottom-5 z-[1000] rounded-full bg-red-50 p-2 text-lg text-black shadow-lg duration-200 hover:-translate-y-1 hover:bg-gray-200"
      onClick={() => {
        setCoord(undefined);
        setShow((prev) => !prev);
      }}
    >
      <PlusIcon
        className={classNames(
          "h-6 w-6 duration-200 ease-in-out",
          show && "rotate-[135deg]"
        )}
      />
    </button>
  );
}
