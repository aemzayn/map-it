import { useRef } from "react";
import classNames from "classnames";
import type { LatLng } from "leaflet";
import { api } from "../utils/api";

type SidebarProps = {
  show: boolean;
  coord: LatLng | undefined;
};

export default function Sidebar({ show, coord }: SidebarProps) {
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
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <aside
      className={classNames(
        "absolute right-0 top-0 bottom-0 z-[1000] col-span-1 w-96 overflow-y-auto bg-slate-700 py-10 px-5 text-lg  drop-shadow-xl transition-all duration-300 ease-in-out",
        show ? "translate-x-0" : "translate-x-full"
      )}
    >
      <form className="w-fullf my-2 space-y-2" onSubmit={onSubmit}>
        <h1 className="text-white">Create</h1>
        <input
          type="text"
          className="form-input w-full rounded-md"
          placeholder="Title"
          ref={titleRef}
          required
        />

        <textarea
          className="form-textarea w-full rounded-md"
          placeholder="Content"
          ref={contentRef}
          required
        />

        <div className="mt-5 flex flex-col gap-2 text-sm">
          {coord && (
            <div className="bg-gray-500 p-1">
              <p>Lat: {coord.lat}</p>
              <p>Long: {coord.lng}</p>
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-gray-600 p-2 text-gray-100">
          Create
        </button>
      </form>
    </aside>
  );
}
