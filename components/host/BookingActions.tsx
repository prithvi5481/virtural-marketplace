'use client';

import { Button } from '@/components/ui/button';
import { cancelHostBooking } from '@/lib/api/bookings';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BookingActions({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await cancelHostBooking(bookingId);
      toast.success('Booking cancelled successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h2 className="font-medium">Actions</h2>
      
      {currentStatus === 'confirmed' && (
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Cancel Booking'}
        </Button>
      )}
      
      <Button variant="outline" className="w-full">
        Contact Guest
      </Button>
      
      <Button variant="outline" className="w-full">
        Reschedule
      </Button>
    </div>
  );
}