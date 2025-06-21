import { fetchSpaceById } from '@/lib/api/spaces';
import SpaceForm from '@/components/host/SpaceForm';

export default async function SpaceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const space = await fetchSpaceById(params.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Space</h1>
      <SpaceForm space={space} isEditing />
    </div>
  );
}