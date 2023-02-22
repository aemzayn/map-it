/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Dispatch, type SetStateAction, useRef } from "react";
import classNames from "classnames";
import type { LatLng } from "leaflet";
import { api } from "../utils/api";

type SidebarProps = {
  show: boolean;
  coord: LatLng | undefined;
  setCoord: Dispatch<SetStateAction<L.LatLng | undefined>>;
  refetchMarkers: () => Promise<void>;
};

export default function Sidebar({
  show,
  coord,
  setCoord,
  refetchMarkers,
}: SidebarProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutateAsync } = api.blog.createBlog.useMutation();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;
    const latitude = coord?.lat;
    const longitude = coord?.lng;

    if (!title || !content || !latitude || !longitude) return;

    mutateAsync({
      title,
      content,
      latitude,
      longitude,
    })
      .then(async (data) => {
        console.log(data);

        // Reset form
        titleRef.current!.value = "";
        contentRef.current!.value = "";
        setCoord(undefined);

        await refetchMarkers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <aside
      className={classNames(
        "absolute right-0 top-0 bottom-0 z-[1000] col-span-1 w-96 overflow-y-auto bg-gray-100 py-10 px-5 text-lg  drop-shadow-xl transition-all duration-300 ease-in-out",
        show ? "translate-x-0" : "translate-x-full"
      )}
    >
      <form className="w-fullf my-2 space-y-2" onSubmit={onSubmit}>
        <h1 className="text-2xl font-semibold">Create</h1>
        <input
          type="text"
          className="form-input w-full rounded-sm border-gray-300"
          placeholder="Title"
          ref={titleRef}
          required
        />

        <textarea
          className="form-textarea w-full rounded-sm border-gray-300"
          placeholder="Content"
          ref={contentRef}
          rows={7}
          required
        />

        <button
          type="submit"
          className="duration-250 w-full rounded-sm border-gray-900 bg-blue-400 p-2 text-white transition-colors ease-in-out hover:bg-blue-500"
        >
          Create
        </button>
      </form>
    </aside>
  );
}
