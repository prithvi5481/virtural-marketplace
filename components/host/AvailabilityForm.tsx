'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { AvailabilitySlot } from '@/types/spaces';
import { updateSpaceAvailability } from '@/lib/api/spaces';

export default function AvailabilityForm({ 
  spaceId,
  initialAvailability 
}: {
  spaceId: string;
  initialAvailability: AvailabilitySlot[];
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<AvailabilitySlot[]>(initialAvailability);
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([]);

  const handleAddSlot = () => {
    if (!date) return;
    
    const newSlot = {
      id: crypto.randomUUID(),
      startTime: new Date(date.setHours(9, 0, 0)),
      endTime: new Date(date.setHours(17, 0, 0)),
      status: 'available' as const
    };

    setSlots([...slots, newSlot]);
  };

  const handleSave = async () => {
    // API call to save availability
    await updateSpaceAvailability(spaceId, slots);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <Calendar
            mode="multiple"
            selected={selectedSlots}
            onSelect={(value) => setSelectedSlots(value ?? [])}
            required={false}
            className="rounded-md border"
          />
          <Button onClick={handleAddSlot} className="mt-4">
            Add Selected Days
          </Button>
        </div>

        <div className="flex-1">
          <h3 className="font-medium mb-4">Current Availability</h3>
          <div className="space-y-2">
            {slots.map((slot, index) => (
              <div key={index} className="p-3 border rounded flex justify-between">
                <div>
                  {format(slot.startTime, 'PPP')} - 
                  {format(slot.startTime, 'h:mm a')} to {format(slot.endTime, 'h:mm a')}
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => setSlots(slots.filter((_, i) => i !== index))}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={handleSave}>Save Availability</Button>
    </div>
  );
}
