import { fetchBookingById } from '@/lib/api/bookings';
import BookingDetail from '@/components/booking/BookingDetail';

export default async function BookingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await fetchBookingById(params.id);
  if(!booking) {
    return <div className="container mx-auto py-8 px-4">Booking not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <BookingDetail booking={booking} />
    </div>
  );
}