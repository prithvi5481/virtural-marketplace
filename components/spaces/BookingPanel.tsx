// components/spaces/BookingPanel.tsx
'use client';

import { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { Button } from '@/components/ui/button';
import { AvailabilitySlot, Space } from '@/types/spaces';

export default function BookingPanel({ space }: { space: Space }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);

  return (
    <div className="border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-2xl font-bold">${space.pricePerHour}</span>
          <span className="text-gray-500"> / hour</span>
        </div>
        <div className="text-sm text-gray-500">
          {space.capacity} {space.capacity === 1 ? 'seat' : 'seats'}
        </div>
      </div>

      <div className="mb-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      {date && (
        <div className="space-y-2 mb-6">
          <h3 className="font-medium">Available Times</h3>
          <div className="grid grid-cols-2 gap-2">
            {space.availability
              ?.filter(slot => 
                new Date(slot.startTime).toDateString() === date.toDateString() &&
                slot.status === 'available'
              )
              .map(slot => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-3 rounded border text-sm ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {new Date(slot.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </button>
              ))}
          </div>
        </div>
      )}

      <Button 
        className="w-full" 
        disabled={!selectedSlot}
      >
        Book Now
      </Button>
    </div>
  );
}