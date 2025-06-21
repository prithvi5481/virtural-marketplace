// app/(host)/spaces/new/page.tsx
import SpaceForm from '@/components/spaces/SpaceForm';

export default function CreateSpacePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Create New Space</h1>
      <SpaceForm />
    </div>
  );
}