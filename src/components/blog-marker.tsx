import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Blog } from "../schema/blog.schema";
import Image from "next/image";
import { api } from "../utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
  blog: Blog;
};

export default function BlogMarker({ blog }: Props) {
  const { data: author } = api.author.getAuthor.useQuery({
    authorId: blog.authorId,
  });

  const icon = L.icon({
    iconUrl: "/images/markers/marker-icon.png",
    iconSize: [14, 22],
  });

  const created = dayjs(blog.createdAt).fromNow();

  return (
    <>
      <Marker
        key={blog.id}
        position={[blog.latitude, blog.longitude]}
        icon={icon}
      >
        <Popup>
          <div className="h-7 w-7 overflow-hidden rounded-full border-blue-500">
            {author?.image && (
              <Image
                width={100}
                height={100}
                alt={author.name || ""}
                src={author.image}
              />
            )}
          </div>
          <h1 style={{ fontWeight: 600 }} className="my-0 text-lg">
            {blog.title}
          </h1>
          <p style={{ margin: 0 }} className="text-md">
            {blog.content}
          </p>
          <p style={{ margin: 0 }} className="text-xs text-gray-500">
            {created}
          </p>
        </Popup>
      </Marker>
    </>
  );
}
