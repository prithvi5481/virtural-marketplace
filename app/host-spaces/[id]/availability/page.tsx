import { fetchSpaceById } from '@/lib/api/spaces';
import AvailabilityForm from '@/components/host/AvailabilityForm';

export default async function AvailabilityPage({
  params,
}: {
  params: { id: string };
}) {
  const space = await fetchSpaceById(params.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Manage Availability for {space.title}
      </h1>
      <AvailabilityForm 
        spaceId={space.id} 
        initialAvailability={space.availability || []} 
      />
    </div>
  );
}