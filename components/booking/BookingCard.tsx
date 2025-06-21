'use client';

import { Booking } from '@/types/bookings';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cancelBooking } from '@/lib/api/bookings';
import { useState } from 'react';

interface BookingCardProps {
  booking: Booking;
  variant: 'user' | 'host';
}

export default function BookingCard({ booking, variant }: BookingCardProps) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelBooking(booking.id);
      router.refresh();
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-medium text-lg mb-1">
            {variant === 'user' ? booking.space?.title : booking.user?.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {format(new Date(booking.startTime), 'PPP')} •{' '}
            {format(new Date(booking.startTime), 'h:mm a')} -{' '}
            {format(new Date(booking.endTime), 'h:mm a')}
          </p>
          <div className="flex gap-2 mt-3">
            <span className={`px-2 py-1 rounded-full text-xs ${
              booking.status === 'confirmed' 
                ? 'bg-green-100 text-green-800' 
                : booking.status === 'cancelled' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800'
            }`}>
              {booking.status}
            </span>
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
              ${booking.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button 
            variant="outline"
            onClick={() => router.push(`/bookings/${booking.id}`)}
          >
            View Details
          </Button>
          
          {variant === 'user' && booking.status === 'confirmed' && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}