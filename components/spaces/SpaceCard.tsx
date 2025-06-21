import Link from 'next/link';
import Image from 'next/image';
import { Space } from '@/types/spaces';

export default function SpaceCard({ space }: { space: Space }) {
  return (
    <Link href={`/spaces/${space.id}`} className="group">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-video relative bg-gray-100">
          {space.thumbnailUrl ? (
            <Image
              src={space.thumbnailUrl}
              alt={space.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
            {space.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
            {space.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold">${space.pricePerHour}/hr</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {space.capacity} seats
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}