import { fetchSpaceById } from '@/lib/api/spaces';
import SpaceGallery from '@/components/spaces/SpaceGallery';
import AmenitiesList from '@/components/spaces/AmenitiesList';
import BookingPanel from '@/components/spaces/BookingPanel';

type SpaceDetailPageProps = {
  params: { id: string }
};

export default async function SpaceDetailPage({ params }: SpaceDetailPageProps) {
  const space = await fetchSpaceById(params.id);
  

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{space.title}</h1>
          <p className="text-gray-600 mb-6">{space.description}</p>
          
          <SpaceGallery images={space.images || []} />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">About This Space</h2>
            <p className="text-gray-700">{space.detailedDescription}</p>
          </div>
          
          <AmenitiesList amenities={space.amenities} />
        </div>
        
        <div className="sticky top-4 h-fit">
          <BookingPanel space={space} />
        </div>
      </div>
    </div>
  );
}