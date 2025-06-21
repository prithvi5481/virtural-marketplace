import SpaceCard from '@/components/spaces/SpaceCard';
import { fetchSpaces } from '@/lib/api/spaces';

export default async function SpacesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // searchParams is a plain object in Next.js App Router
  console.log('Search Params:', searchParams);
  const spaces = await fetchSpaces(searchParams);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Available Co-Working Spaces</h1>
        {/* Client-side filter component would go here */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}