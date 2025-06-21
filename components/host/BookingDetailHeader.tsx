import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Booking } from '@/types/bookings';

export default function BookingDetailHeader({
  booking,
  backLink,
}: {
  booking: Booking;
  backLink: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Booking #{booking.id.slice(0, 8)}</h1>
        <p className="text-gray-600 mt-1">
          {format(new Date(booking.startTime), 'MMMM d, yyyy')} •{' '}
          {format(new Date(booking.startTime), 'h:mm a')} -{' '}
          {format(new Date(booking.endTime), 'h:mm a')}
        </p>
      </div>
      
      <Button asChild variant="outline">
        <Link href={backLink}>
          ← Back to Bookings
        </Link>
      </Button>
    </div>
  );
}