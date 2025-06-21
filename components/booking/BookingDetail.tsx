'use client';

import { Booking } from '@/types/bookings';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function BookingDetail({ booking }: { booking: Booking }) {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Booking Details</h1>
          <p className="text-gray-600">
            {booking.status === 'confirmed' 
              ? 'Upcoming booking' 
              : booking.status === 'cancelled' 
                ? 'Cancelled booking' 
                : 'Completed booking'}
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => router.push(`/spaces/${booking.spaceId}`)}
        >
          View Space
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="font-medium mb-2">Space Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium">{booking.space?.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {booking.space?.description}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-2">Booking Time</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{format(new Date(booking.startTime), 'PPP')}</p>
              <p className="text-gray-600 text-sm mt-1">
                {format(new Date(booking.startTime), 'h:mm a')} -{' '}
                {format(new Date(booking.endTime), 'h:mm a')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-medium mb-2">Payment Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>${(booking.totalPrice * 0.8).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee:</span>
                <span>${(booking.totalPrice * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-medium">Total:</span>
                <span className="font-medium">${booking.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-2">Booking Status</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-500' 
                    : booking.status === 'cancelled' 
                      ? 'bg-red-500' 
                      : 'bg-gray-500'
                }`} />
                <span className="capitalize">{booking.status}</span>
              </div>
              {booking.status === 'cancelled' && (
                <p className="text-sm text-gray-600 mt-2">
                  Cancelled on {format(new Date(booking?.updatedAt), 'PPP')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}