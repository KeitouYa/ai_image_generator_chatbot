import React from "react";

import { getUserImagesFromDb } from "@/actions/image";
import { ImageType } from "@/utils/types/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ImageCard from "@/components/cards/image-card";
import Pagination from "@/components/nav/pagination";

dayjs.extend(relativeTime);

interface DashboardProps {
  searchParams: {
    page?: number;
  };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const page = searchParams.page
    ? parseInt(searchParams.page as unknown as string, 10)
    : 1;

  const limit = 3; //images per page
  const { images, totalCount } = await getUserImagesFromDb(page, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold text-center">Images</h1>
        <p>Your AI-Generated Image Collection</p>
      </div>

      <div className="grid md: grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image: ImageType) => (
          <Link key={image._id} href={`/dashboard/image/${image._id}`}>
            <ImageCard image={image} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center m-20">
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
