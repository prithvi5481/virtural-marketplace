import { Space } from '@/types/spaces';
import { Calendar, Clock, Users, DollarSign, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface SpaceInfoCardProps {
  space: Space;
}

export default function SpaceInfoCard({ space }: SpaceInfoCardProps) {
  return (
    <div className="border rounded-lg p-6 h-full">
      <h2 className="font-medium mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-gray-500" />
        Space Information
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Space Thumbnail */}
        <div className="relative aspect-square w-full sm:w-32 rounded-lg overflow-hidden">
          {space.thumbnailUrl ? (
            <Image
              src={space.thumbnailUrl}
              alt={space.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 150px"
            />
          ) : (
            <div className="bg-gray-100 h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        
        {/* Space Details */}
        <div className="flex-1 space-y-3">
          <h3 className="font-medium text-lg">{space.title}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span>Capacity: {space.capacity} {space.capacity === 1 ? 'person' : 'people'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="h-4 w-4" />
              <span>${space.pricePerHour}/hour</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Created: {new Date(space.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Amenities Preview */}
          {space.amenities && space.amenities.length > 0 && (
            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-1">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {space.amenities.slice(0, 3).map((amenity) => (
                  <span 
                    key={amenity} 
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {amenity}
                  </span>
                ))}
                {space.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{space.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <Button asChild variant="link" className="pl-0 mt-2">
            <Link href={`/host/spaces/${space.id}`}>
              View Space Details →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}