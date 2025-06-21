// components/spaces/SpaceForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { createSpace } from '@/lib/api/spaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SpaceForm() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const newSpace = await createSpace(data);
      router.push(`/spaces/${newSpace.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Form fields same as previous example */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isSubmitting ? 'Creating...' : 'Create Space'}
      </button>
    </form>
  );
}